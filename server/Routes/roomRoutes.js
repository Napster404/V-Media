import express from "express";
import mongoUsers from "../Models/mongoUsers.js";
import mongoRooms from "../Models/mongoRooms.js";

const router = express.Router();

// Create New Direct Room
router.post("/create/directRoom", (req, res) => {
	mongoUsers.findOne({ email: req.body.userEmail }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else if (data === null) {
			res.send(data);
		} else if (data.userId === req.body.userId) {
			res.send("Same User");
		} else {
			const roomData = { usersArray: [req.body.userId, data.userId] };
			mongoRooms.create(roomData, (err2, data2) => {
				if (err2) {
					res.status(500).send(err2);
				} else {
					const roomId = data2._id;
					mongoUsers.findOneAndUpdate(
						{ userId: data.userId },
						{ $push: { roomsArray: roomId } },
						(err3) => {
							if (err3) {
								console.log(err);
							}
						}
					);

					mongoUsers.findOneAndUpdate(
						{ userId: req.body.userId },
						{ $push: { roomsArray: roomId } },
						{ returnOriginal: false },
						(err3) => {
							if (err3) {
								console.log(err);
							}
						}
					);
				}
			});
		}
	});
});

// Retrieve all User Rooms
router.get("/retrieve/rooms", (req, res) => {
	mongoUsers.findOne({ userId: req.query.userId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send({
				roomId: data._id,
				title: data.title,
				usersArray: data.usersArray,
			});
		}
	});
});

// Retrieve Rooms Data
router.get("/retrieve/roomData", (req, res) => {
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

// Upload New Message to Room
router.post("/upload/message", (req, res) => {
	mongoRooms.findOneAndUpdate(
		{ _id: req.body.roomId },
		{ $push: { messagesArray: req.body.data } },
		{ returnOriginal: false },
		(err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.status(201).send(data);
			}
		}
	);
});

// Upload Messages from Room
router.get("/retrieve/messages", (req, res) => {
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.send(data);
		}
	});
});

router.get("/update/room/addMember", (req, res) => {
	// console.log(req);
	mongoRooms.findOne({ _id: req.query.roomId }, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			mongoUsers.findOne({ email: req.query.email }, (err2, data2) => {
				if (err2) {
					console.log(err2);
				} else if (data.usersArray.includes(data2.userId)) {
					res.send("Error");
				} else {
					mongoUsers.findOneAndUpdate(
						{ email: req.query.email },
						{ $push: { roomsArray: req.query.roomId } },
						{ returnOriginal: false },
						(err2, data3) => {
							if (err2) {
								console.log(err2);
							} else if (data3 === null) {
								res.send(data3);
							} else {
								mongoRooms.findOneAndUpdate(
									{ _id: req.query.roomId },
									{ $push: { usersArray: data3.userId } },
									(err4) => {
										if (err4) {
											res.status(500).send(err4);
										}
									}
								);

								res.send(data3.roomsArray);
							}
						}
					);
				}
			});
		}
	});
});

router.get("/update/room/removeMember", (req, res) => {
	console.log("delete request here");
	mongoUsers.findOneAndUpdate(
		{ userId: req.query.userId },
		{ $pull: { roomsArray: req.query.roomId } },
		{ returnOriginal: false },
		(err1) => {
			if (err1) console.log(err1);
			else {
				mongoRooms.findOneAndUpdate(
					{ _id: req.query.roomId },
					{ $pull: { usersArray: req.query.userId } },
					(err2, data) => {
						if (err2) console.log(err2);
						// else {
						// 	console.log(data, data.usersArray.length, roomId)
						// }
						else if (data.usersArray.length <= 1) {
							console.log("deleting empty room");
							mongoRooms.findOneAndDelete(
								{ _id: req.query.roomId },
								(err2, dataroom) => {
									if (err2) console.log(err2);
									else {
										res.send(dataroom);
									}
								}
							);
						}
					}
				);
			}
		}
	);
});

router.get("/update/room/removeDirectRoom", (req, res) => {
	console.log("Direct Room Deleted");
	const roomId = req.query.roomId;

	mongoRooms.findOneAndUpdate(
		{ _id: roomId },
		{ $pull: { usersArray: req.query.userId } },
		(err, data) => {
			if (err) console.log(err);
			else {
				console.log("deleting member", data);
				data.usersArray.map((userId) => {
					return mongoUsers.findOneAndUpdate(
						{ userId: userId },
						{ $pull: { roomsArray: roomId } },
						(err1, data) => {
							if (err1) console.log(err1);
							console.log("Member Deleted", userId);
						}
					);
				});
				mongoRooms.findOneAndDelete(
					{ _id: req.query.roomId },
					(err2, dataroom) => {
						if (err2) console.log(err2);
						else {
							res.send(dataroom);
						}
					}
				);

				// res.send(data);
				console.log("Room data" + data);
			}
		}
	);
});
export default router;
