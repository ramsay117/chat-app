## Authentication
`┌───────────┐          ┌───────────┐          ┌───────────┐
│  Client   │          │  Backend  │          │ Database  │
│ (React)   │          │ (Node.js) │          │ (MongoDB) │
└─────┬─────┘          └─────┬─────┘          └─────┬─────┘
      │        1. Login      │                      │      
      │ ────────────────────>│                      │      
      │                      │    2. Validate       │      
      │                      │ ────────────────────>│      
      │                      │<──────────────────── │ 3.    
      │                      │                      │      
      │                      │ 4. Verify Password   │      
      │                      │ 5. Generate JWT      │      
      │                      │                      │      
      │ 6. Set Cookie        │                      │      
      │<─────────────────────│                      │      
      │ 7. Store User        │                      │      
      │ ────────────────────>│                      │      
      │                      │                      │      
      │        8. Request    │                      │      
      │ ────────────────────>│                      │      
      │                      │ 9. Verify JWT        │      
      │                      │10. Fetch User        │      
      │                      │ ────────────────────>│      
      │                      │<──────────────────── │11.    
      │12. Response          │                      │      
      │<─────────────────────│                      │      
┌─────┴─────┐          ┌─────┴─────┐          ┌─────┴─────┐
│ Cookies   │          │           │          │           │
└───────────┘          └───────────┘          └───────────┘`

## Models

### Conversation Model

The `Conversation` model is used to track the dialog between users. It has the following attributes:

- **participants**: Array of user IDs participating in the conversation. This represents the users who can view and send messages in this conversation.
- **messages**: Array of message IDs that belong to the conversation. This represents the individual messages that have been exchanged in the conversation.

### Message Model

The `Message` model represents a single message within a conversation. It contains the following attributes:

- **senderId**: ID of the user who sent the message. This identifies who originated the message.
- **receiverId**: ID of the user who is the recipient of the message. In the context of a conversation, this could be the ID of the individual user or the conversation itself if it's a group chat.
- **message**: The textual content of the message. This is the actual message sent by the user.

### Middleware

Before sending a message, the user should be logged in, and during the check, we will place the user in the `req` object. Then, in subsequent handlers, we can use this user's ID as the `senderId`.

## Frontend

## Auth User

Save the logged-in user's information in localStorage and use AuthContext in your app to manage whether the user is logged in or not. This way, if someone is logged in, they can see the home page; if not, they get sent to the login page
