import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#18191B] border-b border-white/[0.06] py-2.5 text-center">
      <Link
        href="#"
        className="text-sm text-[#797D86] hover:text-white transition-colors"
      >
        ✦ Synapse AI v2.0 is now available — Deploy any LLM in seconds →
      </Link>
    </div>
  );
}
