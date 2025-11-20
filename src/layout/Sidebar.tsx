"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
  PinIcon,
  PinIconFilled,
  Books,
  CalendarCog,
  CampusLogo,
  CourseLogo,
  BatchLogo,
  TimeIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; icon: React.ReactNode; path: string; pro?: boolean; new?: boolean }[];
};

// Menu for User
const userNavItems: NavItem[] = [
  { name: "Dashboard", icon: <GridIcon />, path: "/" },
  {
    name: "Academics",
    icon: <Books />,
    subItems: [
      { name: "Academic Year", icon: <CalendarCog />, path: "/user/academicYear" },
      { name: "Student", icon: <UserCircleIcon />, path: "/user/student" },
      { name: "Employee", icon: <CalenderIcon />, path: "/user/employee" },
      { name: "Course", icon: <CourseLogo />, path: "/user/course" },
      { name: "Batch", icon: <BatchLogo />, path: "/user/batch" },
      { name: "Exam", icon: <BatchLogo />, path: "/user/exam" },
      { name: "Exam Class", icon: <BatchLogo />, path: "/user/examClass" },
      { name: "Exam Papers", icon: <BatchLogo />, path: "/user/examPaper" },
      { name: "Attendance Status", icon: <BatchLogo />, path: "/user/attendanceStatus" },
      { name: "Period", icon: <BatchLogo />, path: "/user/period" },
    ],
  },
  { name: "Calendar", icon: <CalenderIcon />, path: "/calendar" },
  { name: "User Profile", icon: <UserCircleIcon />, path: "/profile" },
];

// Menu for Admin
const adminNavItems: NavItem[] = [
  { name: "Dashboard", icon: <GridIcon />, path: "/" },
  {
    name: "Books Management",
    icon: <Books />,
    subItems: [
      { name: "Campus Group", icon: <CampusLogo />, path: "/admin/campusGroup" },
      { name: "Campus", icon: <CampusLogo />, path: "/admin/campus" },
      { name: "Employee", icon: <CampusLogo />, path: "/admin/employee" },
      { name: "Class", icon: <CampusLogo />, path: "/admin/class" },
    ],
  },
  { name: "Calendar", icon: <CalenderIcon />, path: "/calendar" },
  { name: "User Profile", icon: <UserCircleIcon />, path: "/profile" },
];

const navItems: NavItem[] = [
  { name: "Dashboard", icon: <GridIcon />, path: "/", },
  {
    name: "Academics", icon: <Books />, subItems: [
      { name: "Academic Year", icon: <CalendarCog />, path: "/user/academicYear" },
      { name: "Student", icon: <UserCircleIcon />, path: "/user/student" },
      { name: "Employee", icon: <CalenderIcon />, path: "/user/employee" },
      { name: "Course", icon: <CourseLogo />, path: "/user/course" },
      { name: "Batch", icon: <BatchLogo />, path: "/user/batch" },
      { name: "Exam", icon: <BatchLogo />, path: "/user/exam" },
      { name: "Exam Class", icon: <BatchLogo />, path: "/user/examClass" },
      { name: "Exam Papers", icon: <BatchLogo />, path: "/user/examPaper" },
      { name: "Attendance Status", icon: <BatchLogo />, path: "/user/attendanceStatus" },
      { name: "Period", icon: <BatchLogo />, path: "/user/period" },
    ],
  },
  {
    name: "Campuses",
    icon: <Books />,
    subItems: [
      { name: "Campus Group", icon: <CampusLogo />, path: "/admin/campusGroup" },
      { name: "Campus", icon: <CampusLogo />, path: "/admin/campus" },
      { name: "Employee", icon: <CampusLogo />, path: "/admin/employee" },
    ],
  },
  {
    name: "Calendar",
    icon: <CalenderIcon />,
    path: "/calendar",
  },
  {
    name: "Period",
    icon: <TimeIcon />,
    path: "/period",
  },
  {
    name: "User Profile",
    icon: <UserCircleIcon />,
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", icon: <CalenderIcon />, path: "/form-elements" }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", icon: <CalenderIcon />, path: "/basic-tables" }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", icon: <CalenderIcon />, path: "/blank" },
      { name: "404 Error", icon: <CalenderIcon />, path: "/error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", icon: <CalenderIcon />, path: "/line-chart", pro: false },
      { name: "Bar Chart", icon: <CalenderIcon />, path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", icon: <CalenderIcon />, path: "/alerts", pro: false },
      { name: "Avatar", icon: <CalenderIcon />, path: "/avatars", pro: false },
      { name: "Badge", icon: <CalenderIcon />, path: "/badge", pro: false },
      { name: "Buttons", icon: <CalenderIcon />, path: "/buttons", pro: false },
      { name: "Images", icon: <CalenderIcon />, path: "/images", pro: false },
      { name: "Videos", icon: <CalenderIcon />, path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", icon: <CalenderIcon />, path: "/signin", pro: false },
      { name: "Sign Up", icon: <CalenderIcon />, path: "/signup", pro: false },
    ],
  },
];

const Sidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const isUserRoute = pathname.startsWith("/user");
  const isAdminRoute = pathname.startsWith("/admin");

  // Dynamically filter menu items
  const filteredNavItems = [
    ...(isUserRoute ? userNavItems : isAdminRoute ? adminNavItems : navItems),
    ...(!isUserRoute && !isAdminRoute ? othersItems : []),
  ];

  /** =========================
   * STATE FOR PINNED ITEMS
   * ========================= */
  const [pinnedItems, setPinnedItems] = useState<{ name: string; path: string; icon: React.ReactNode }[]>([]);

  // Load pinned items from localStorage
  useEffect(() => {
    const savedPins = localStorage.getItem("pinnedItems");
    if (savedPins) {
      setPinnedItems(JSON.parse(savedPins));
    }
  }, []);

  // Save pinned items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pinnedItems", JSON.stringify(pinnedItems));
  }, [pinnedItems]);

  /** =========================
   * FUNCTIONS FOR PIN ACTION
   * ========================= */
  const togglePin = (item: { name: string; path: string; icon: React.ReactNode }) => {
    setPinnedItems((prev) => {
      const exists = prev.find((p) => p.path === item.path);
      if (exists) {
        // Unpin
        return prev.filter((p) => p.path !== item.path);
      } else {
        // Pin
        return [...prev, item];
      }
    });
  };

  const isPinned = (path: string) => pinnedItems.some((item) => item.path === path);

  /** =========================
   * HANDLE SUBMENU
   * ========================= */
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu?.type === menuType && prevOpenSubmenu?.index === index) {
        return null; // Close if same submenu clicked
      }
      return { type: menuType, index };
    });
  };

  /** =========================
   * RENDER MENU ITEMS
   * ========================= */
  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <div>
              {/* Parent Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmenuToggle(index, menuType);
                }}
                className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                  }`}
              >
                <span className={`${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
                      }`}
                  />
                )}
              </button>

              {/* Submenu */}
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name} className="flex items-center justify-between group">
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item flex-1 ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                      >
                        <span className="flex items-center gap-3">{subItem.icon}{subItem.name}</span>
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          togglePin({ name: subItem.name, path: subItem.path, icon: nav.icon });
                        }}
                        className="ml-2 text-gray-400 hover:text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {isPinned(subItem.path) ? <PinIconFilled className="text-brand-500" /> : <PinIcon />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            nav.path && (
              <div className="flex items-center justify-between">
                <Link
                  href={nav.path}
                  className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
                >
                  <p className="flex items-center gap-3">
                    <span className={`${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                    {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                  </p>
                  {/* <button
                    onClick={() => togglePin({ name: nav.name, path: nav.path, icon: nav.icon })}
                    className="ml-2 text-gray-400 hover:text-brand-500"
                  >
                    {isPinned(nav.path) ? <PinIconFilled className="text-brand-500" /> : <PinIcon />}
                  </button> */}
                </Link>
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  );

  /** =========================
   * CALCULATE SUBMENU HEIGHT
   * ========================= */
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  /** =========================
   * AUTO OPEN SUBMENU BASED ON URL
   * ========================= */
  useEffect(() => {
    let submenuMatched = false;
    (["main", "others"] as const).forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        nav.subItems?.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: menuType, index });
            submenuMatched = true;
          }
        });
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-500 dark:text-white">
                Book<span className="text-gray-800 dark:text-brand-500">Nexa</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-xl font-bold text-brand-500 dark:text-white">E</span>
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          {/* Quick Access */}
          {pinnedItems.length > 0 && (
            <div className="mb-6">
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
                Quick Access
              </h2>
              <ul className="flex flex-col gap-3">
                {pinnedItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`menu-item group ${isActive(item.path) ? "menu-item-active" : "menu-item-inactive"}`}
                    >
                      <p className="flex items-center gap-3">
                        <span className={isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                          {item.icon}
                        </span>
                        {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{item.name}</span>}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Menu */}
          <div>
            <h2 className={`mt-4 mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
              {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
            </h2>
            {/* {renderMenuItems(navItems, "main")} */}
            {renderMenuItems(filteredNavItems, "main")}
          </div>

          {/* Others */}
          {/* <div>
            <h2 className={`mt-4 mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
              {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontaLDots />}
            </h2>
            {renderMenuItems(othersItems, "others")}
          </div> */}
        </nav>

        {/* Sidebar Widget */}
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default Sidebar;
