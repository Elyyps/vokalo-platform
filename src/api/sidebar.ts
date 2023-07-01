import { ISidebar } from "../types/modules/sidebar";

export const sidebarData = (): ISidebar => ({
  logo: "Vokalo",
  items: [
    // { title: "Dashboard", icon: "/icons/dashboard.svg", route: "/" },
    // { title: "Coach", icon: "/icons/coach.svg", route: "/coach" },
    { title: "Sessions", icon: "/icons/sessions.svg", route: "/sessions" },
    { title: "Squad", icon: "/icons/squad.svg", route: "/squad" },
    // { title: "Video sync", icon: "/icons/video.svg", route: "/video-sync" },
    // {
    //   title: "Recordings",
    //   icon: "/icons/recordings.svg",
    //   route: "/recordings",
    // },
    // { title: "Settings", icon: "/icons/settings.svg", route: "/settings" },
  ],
});
export const sidebarAdminData = (): ISidebar => ({
  logo: "Vokalo",
  items: [
    { title: "Admin panel", icon: "/icons/dashboard.svg", route: "/admin/" },
    { title: "Audio", icon: "/icons/video.svg", route: "/admin/recordings" },
    { title: "Settings", icon: "/icons/settings.svg", route: "#" },
  ],
});
