export default function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "#0C0D0D" }}>
      {/* Rainbow gradient line at very top */}
      <div className="rainbow-bar h-[3px] w-full" />
      {/* Announcement text */}
      <div className="flex items-center justify-center py-2.5 px-4 text-center">
        <a
          href="#"
          className="text-[13px] leading-tight transition-colors"
          style={{ color: "#94979E" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
        >
          Arcadia builds AI-powered coding agents using Synapse for instant model provisioning.{" "}
          <span style={{ color: "#F9FAFA" }}>Read the Case Study</span>
          {" "}&rsaquo;
        </a>
      </div>
    </div>
  );
}
