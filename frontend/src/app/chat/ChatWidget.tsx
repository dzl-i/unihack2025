declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": HTMLElement;
    }
  }
}

export default function ChatWidget({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* @ts-ignore */}
      <langflow-chat
        chat_inputs='{"your_key":"value"}'
        chat_input_field="your_chat_key"
        placeholder="Type your message..."
        window_title="Chat with CollabAI"
        flow_id="your_flow_id"
        host_url="langflow_url"
        chat_window_style={{
          backgroundColor: "#1c1a26",
          color: "#ffffff",
          boxShadow: "none",
          borderRadius: "0px",
        }}
        chat_trigger_style={{
          backgroundColor: "#1c1a26",
          color: "#fffffff",
        }}
      />
    </div>
  );
}
