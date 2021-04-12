import { gql } from 'apollo-boost';

const GetRoom = gql`
    mutation GetRoom($id: ID!){
        room(id: $id){
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
`

const AddDirectRoom = gql`
    mutation AddDirectRoom($userId: ID!, $userEmail: String!, $title: String){
        addDirectRoom(userId: $userId, userEmail: $userEmail, title: $title){
            _id
        }
    }
`

const DeleteDirectRoom = gql`
    mutation DeleteDirectRoom($id: ID!){
        deleteDirectRoom(id: $id){
            _id
        }
    }
`

const AddGroupRoom = gql`
    mutation AddGroupRoom($userId: ID!, $title: String!){
        addGroupRoom(userId: $userId, title: $title){
            _id
        }
    }
`

const AddMember = gql`
    mutation AddMember($id: ID!, $userEmail: String!){
        addMember(id: $id, userEmail: $userEmail){
            _id
        }
    }
`

const DeleteMember = gql`
    mutation DeleteMember($id: ID!, $userId: ID!, $username: String!){
        deleteMember(id: $id, userId: $userId, username: $username){
            _id
        }
    }
`

const AddMessage = gql`
    mutation AddMessage($id: ID!, $userId: ID!, $username: String!, $content: String!, $timestamp: String!, $replyId: ID){
        addMessage(id: $id, userId: $userId, username: $username, content: $content, timestamp: $timestamp, replyId: $replyId){
            _id
        }
    }
`

const DeleteMessage = gql`
    mutation DeleteMessage($id: ID!, $messageId: ID!){
        deleteMessage(id: $id, messageId: $messageId){
            _id
        }
    }
`

export { GetRoom, AddDirectRoom, DeleteDirectRoom, AddGroupRoom, AddMember, DeleteMember, AddMessage, DeleteMessage };