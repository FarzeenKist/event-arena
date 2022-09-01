import React from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack, Form } from "react-bootstrap";
import { useState } from "react";

const Event = ({
	event,
	register,
	changelocation,
	endevent,
	isOwner,
}) => {
	const {
		id,
		title,
		dateandtime,
		image,
		description,
		location,
		price,
		owner,
		attendants,
	} = event;

	const [newLocation, setNewLocation] = useState("");

	const triggerRegister = () => {
		register(id, price);
	};

	const triggerChangeLocation = () => {
		changelocation(id, newLocation);
	};
	const triggerEndevent = () => {
		endevent(id);
	};
	

	return (
		<Col>
			<Card className=" h-100">
				<Card.Header>
					<Stack direction="horizontal" gap={3}>
						<span className="font-monospace text-secondary">
							{owner}
						</span>
						<Badge bg="secondary" className="ms-auto">
							{attendants} Attendants
						</Badge>
					</Stack>
				</Card.Header>
				<div className=" ratio ratio-4x3">
					<img
						src={image}
						alt={title}
						style={{ objectFit: "cover" }}
					/>
				</div>
				<Card.Body className="d-flex  flex-column text-center">
					<Card.Title>{title}</Card.Title>
					<Card.Title> {location}</Card.Title>
					<Card.Text className="flex-grow-1 ">
						{description}
					</Card.Text>
					<Card.Text className="text-secondary">
						<span>{dateandtime}</span>
					</Card.Text>

					

					{isOwner === true && (
						<>
							<Form.Control
								className={"pt-2 mb-1"}
								type="text"
								placeholder="Enter new Location"
								onChange={(e) => {
									setNewLocation(e.target.value);
								}}
							/>

							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggerChangeLocation()}
							>
								Change Location
							</Button>
						</>
					)}

					{isOwner === true && (
						<>
							<Button
								variant="primary"
								className={"mb-4"}
								onClick={() => triggerEndevent()}
							>
								End Event
							</Button>
						</>
					)}

					

					{isOwner !== true && (
						<Button
							variant="outline-dark"
							onClick={triggerRegister}
							className="w-100 py-3"
						>
							Register for {utils.format.formatNearAmount(price)} NEAR
						</Button>
					
					)}
				</Card.Body>
			</Card>
		</Col>
	);
};

Event.propTypes = {
	event: PropTypes.instanceOf(Object).isRequired,
	register: PropTypes.func.isRequired,
};

export default Event;
