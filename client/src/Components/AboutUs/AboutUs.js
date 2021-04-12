import React from "react";
import "./AboutUs.css";
import { LinkedIn, GitHub, Mail } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const AboutUs = () => {
	return (
		<div className="about">
			<div className="about__heading">Meet the Team</div>
			<div className="card_container">
				<div className="card_1 card">
					<div className="card_img">
						<img src="https://media-exp1.licdn.com/dms/image/C5603AQH55E6ahPSbjA/profile-displayphoto-shrink_800_800/0/1587156175552?e=1620864000&v=beta&t=dVJKMa7tWHa632NxS5KfGTtncWn0rXHlA5QXr1TN6hU" />
					</div>
					<div className="card_socialmedia">
						<form action='https://www.linkedin.com/in/puneet-jangid-26a0ba16b/' target="_blank">
							<IconButton className="blue" type='submit'>
								<LinkedIn />
							</IconButton>
						</form>
						<form action='https://github.com/Napster404' target="_blank">
							<IconButton className="black" type='submit'>
								<GitHub />
							</IconButton>
						</form>
						<form action='mailto:puneetjangid349@gmail.com' target="_blank">
							<IconButton className="red" type='submit'>
								<Mail />
							</IconButton>
						</form>
					</div>

					<div className="name align_center">
						<h3>Puneet Jangid</h3>
					</div>
					<div className="college_info">
						<div className="college_name align_center">
							<h5>Delhi Technological University</h5>
						</div>
						<div className="degree align_center">
							<h6>Computer Engineering</h6>
						</div>
					</div>
				</div>
				<div className="card_2 card">
					<div className="card_img">
						<img src="https://media-exp1.licdn.com/dms/image/C4D03AQHeMy9dQaf6IA/profile-displayphoto-shrink_800_800/0/1566177968990?e=1620864000&v=beta&t=gbhDhSZEhrvebULNQnn4oIR8MgHwmjK9U94mubwoPVM" />
					</div>

					<div className="card_socialmedia">
						<form action='https://www.linkedin.com/in/rahul990/' target="_blank">
							<IconButton className="blue" type='submit'>
								<LinkedIn />
							</IconButton>
						</form>
						<form action='https://github.com/Rahulk990' target="_blank">
							<IconButton className="black" type='submit'>
								<GitHub />
							</IconButton>
						</form>
						<form action='mailto:rahulv0530@gmail.com' target="_blank">
							<IconButton className="red" type='submit'>
								<Mail />
							</IconButton>
						</form>
					</div>

					<div className="name align_center">
						<h3>Rahul</h3>
					</div>
					<div className="college_info">
						<div className="college_name align_center">
							<h5>Delhi Technological University</h5>
						</div>
						<div className="degree align_center">
							<h6>Computer Engineering</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
