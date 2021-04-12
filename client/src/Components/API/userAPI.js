import { gql } from 'apollo-boost';

const AddUser = gql`
    mutation AddUser($name: String!, $avatar: String!, $email: String!){
        addUser(name: $name, avatar: $avatar, email: $email){
            _id
            name
            email
            avatar
        }
    }
`;

const GetUser = gql`
    mutation GetUser($id: ID!){
        user(id: $id){
            _id
            name
            email
            avatar
        }
    }
`;

const GetEvents = gql`
    mutation GetEvents($id: ID!){
        user(id: $id){
            eventsArray{
                _id
                heading
                description
                timestamp
            }
        }
    }
`;

const AddEvent = gql`
    mutation AddEvent($id: ID!, $heading: String!, $description: String!, $timestamp: String!){
        addEvent(id: $id, heading: $heading, description: $description, timestamp: $timestamp){
            eventsArray{
                _id
                heading
                description
                timestamp
            }
        }
    }
`;

const DeleteEvent = gql`
    mutation DeleteEvent($id: ID!, $eventId: ID!){
        deleteEvent(id: $id, eventId: $eventId){
            eventsArray{
                _id
                heading
                description
                timestamp
            }
        }
    }
`;

const GetRooms = gql`
    mutation GetRooms($id: ID!){
        user(id: $id){
            userRooms{
                _id
                title
                users{
                    _id
                    name
                    avatar
                    email
                }
                messagesArray{
                    _id
                    userId
                    replyId
                    username
                    content
                    timestamp
                }
            }
        }
    }
`

export { AddUser, GetUser, AddEvent, GetEvents, DeleteEvent, GetRooms };