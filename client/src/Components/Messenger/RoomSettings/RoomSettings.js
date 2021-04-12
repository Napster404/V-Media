import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import "./RoomSettings.css";

import { selectUser } from "../../ReduxStore/appSlice";
import { useSelector } from "react-redux";
import AddNewMember from "./AddNewMember";
import GroupMember from "./GroupMember";
import OutsideAlerter from "../../Misc/OutsideAlerter";
import {
	AddRounded,
	ExitToAppRounded,
	PermIdentityRounded,
} from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { DeleteDirectRoom, DeleteMember } from "../../API/roomAPI";


const RoomSettings = ({ roomId, isGroup, usersArray }) => {

	const history = useHistory()
	const user = useSelector(selectUser);

	const [deleteDirectRoom] = useMutation(DeleteDirectRoom)
	const [deleteMember] = useMutation(DeleteMember)

	const [addMemberDialog, setAddMemberDialog] = useState(false);
	const [viewMembersDialog, setViewMembersDialog] = useState(false);

	const exitFromGroup = async (e) => {
		await deleteMember({ variables: { id: roomId, userId: user._id, username: user.name } });
		history.replace('/messenger')
	};

	const deleteRoom = async (e) => {
		await deleteDirectRoom({ variables: { id: roomId } });
		history.replace('/messenger')
	};

	return (
		<>
			{(isGroup === "group") ? (
				<div className="roomSettings">

					<Tooltip title="Add Member" enterDelay={1000}>
						<div
							className="roomSetting__listOption"
							onClick={() => setAddMemberDialog(!addMemberDialog)}
						>
							<IconButton>
								<AddRounded />
							</IconButton>
						</div>
					</Tooltip>

					{addMemberDialog && (
						<OutsideAlerter
							open={addMemberDialog}
							outsideHandler={() => setAddMemberDialog(!addMemberDialog)}
							component={<AddNewMember roomId={roomId} usersArray={usersArray}/>}
						/>
					)}

					<Tooltip title="Group Members" enterDelay={1000}>
						<div
							className="roomSetting__listOption"
							onClick={() => setViewMembersDialog(!viewMembersDialog)}
						>
							<IconButton>
								<PermIdentityRounded />
							</IconButton>
						</div>
					</Tooltip>

					{viewMembersDialog && (
						<OutsideAlerter
							open={viewMembersDialog}
							outsideHandler={() => setViewMembersDialog(!viewMembersDialog)}
							component={
								<div className="groupMember__dialog">
									{usersArray.map((user) => (
										<GroupMember key={user._id} user={user} />
									))}
								</div>
							}
						/>
					)}

					<Tooltip title="Exit" enterDelay={1000}>
						<div className="roomSetting__listOption">
							<IconButton onClick={exitFromGroup}>
								<ExitToAppRounded />
							</IconButton>
						</div>
					</Tooltip>

				</div>
			) : (
				<div className="roomSettings">

					<Tooltip title="Exit" enterDelay={1000}>
						<div className="roomSetting__listOption">
							<IconButton onClick={deleteRoom}>
								<ExitToAppRounded />
							</IconButton>
						</div>
					</Tooltip>

				</div>
			)}
		</>
	);
};

export default RoomSettings;
