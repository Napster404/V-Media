import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import "./RoomSettings.css";

import { selectUser } from "../../ReduxStore/appSlice";
import { useSelector } from "react-redux";
import AddMember from "./AddMember";
import GroupMember from "./GroupMember";
import OutsideAlerter from "../../Misc/OutsideAlerter";
import {
	AddRounded,
	ExitToAppRounded,
	PermIdentityRounded,
} from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import removeMember from "../../API/removeMember";
import removeDirectRoom from "../../API/removeDirectRoom";


const RoomSettings = ({ roomId, isGroup, usersArray }) => {

	const history = useHistory()
	const user = useSelector(selectUser);
	const [addMemberDialog, setAddMemberDialog] = useState(false);
	const [viewMembersDialog, setViewMembersDialog] = useState(false);

	const exitFromGroup = async (e) => {
		await removeMember(user.userId, roomId);
		history.replace('/messenger')
	};

	const deleteRoom = (e) => {
		removeDirectRoom(roomId);
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
							component={<AddMember roomId={roomId} />}
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
									{usersArray.map((userId) => (
										<GroupMember key={userId} userId={userId} />
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
