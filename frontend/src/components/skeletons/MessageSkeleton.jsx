const MessageSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Received message skeleton */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="skeleton w-10 h-10 rounded-full" />
        </div>
        <div className="chat-bubble skeleton w-52 h-10" />
        <div className="chat-footer skeleton w-12 h-4 mt-1" />
      </div>

      {/* Sent message skeleton */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="skeleton w-10 h-10 rounded-full" />
        </div>
        <div className="chat-bubble skeleton w-40 h-8" />
        <div className="chat-footer skeleton w-12 h-4 mt-1" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
