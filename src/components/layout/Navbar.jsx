import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiListBold, PiPlusBold, PiBellSimpleBold, PiChatCircleDotsBold, PiCaretDownBold, PiCaretRightBold, PiUserBold, PiStorefrontBold, PiUsersBold, PiChartLineUpBold, PiCreditCardBold, PiLifebuoyBold, PiSignOutBold, PiClockBold, PiReceiptBold,PiStarBold, PiPackageBold, PiWarningBold, PiForkKnifeBold, PiCheckCircleBold, PiCircleFill,} from "react-icons/pi";

const NOTIFICATIONS = [
  {
    id: 1,
    icon: PiReceiptBold,
    title: "New order received",
    message: "Table T-4 placed an order worth Rs 2,450",
    time: "2 min ago",
    unread: true,
  },

  {
    id: 2,
    icon: PiStarBold,
    title: "New 5-star review",
    message: "Ahmed left a review for Chicken Karahi",
    time: "12 min ago",
    unread: true,
  },
  {
    id: 3,
    icon: PiForkKnifeBold,
    title: "Order ready",
    message: "Kitchen marked order #1042 as ready",
    time: "25 min ago",
    unread: true,
  },
  {
    id: 4,
    icon: PiPackageBold,
    title: "Low stock alert",
    message: "Chicken breast is running low in inventory",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 5,
    icon: PiCreditCardBold,
    title: "Payment received",
    message: "Online payment of Rs 1,850 confirmed",
    time: "2 hr ago",
    unread: false,
  },
  {
    id: 6,
    icon: PiWarningBold,
    title: "Order delayed",
    message: "Delivery order #1038 is taking longer than usual",
    time: "3 hr ago",
    unread: false,
  },
  {
    id: 7,
    icon: PiUsersBold,
    title: "Staff check-in",
    message: "Bilal checked in for the evening shift",
    time: "5 hr ago",
    unread: false,
  },
  {
    id: 8,
    icon: PiCheckCircleBold,
    title: "Order completed",
    message: "Order #1029 was completed successfully",
    time: "Yesterday",
    unread: false,
  },
];

const MESSAGES = [
  {
    id: 1,
    name: "Ali Hassan",
    initials: "AK",
    preview: "Can I get extra raita with the order?",
    time: "1 min ago",
    online: true,
    unread: true,
  },
  {
    id: 2,
    name: "Ali Abbasi",
    initials: "UT",
    preview: "Table 6 is asking for the bill",
    time: "8 min ago",
    online: true,
    unread: true,
  },

  {
    id: 3,
    name: " Ahmed",
    initials: "SA",
    preview: "Is the BBQ platter available today?",
    time: "20 min ago",
    online: false,
    unread: true,
  },
  {
    id: 4,
    name: "Hamza Sheikh",
    initials: "HS",
    preview: "Thank you, food was amazing!",
    time: "45 min ago",
    online: false,
    unread: false,
  },
  {
    id: 5,
    name: "Zainab Malik",
    initials: "ZM",
    preview: "Please make it less spicy this time",
    time: "1 hr ago",
    online: true,
    unread: false,
  },
  {
    id: 6,
    name: "Bilal Chaudhry",
    initials: "BC",
    preview: "Delivery address updated, please confirm",
    time: "2 hr ago",
    online: false,
    unread: false,
  },
];

const PROFILE_MENU = [
  { label: "My Profile", icon: PiUserBold },
  { label: "Restaurant Settings", icon: PiStorefrontBold },
  { label: "Manage Staff", icon: PiUsersBold },
  { label: "Analytics", icon: PiChartLineUpBold },
  { label: "Billing", icon: PiCreditCardBold },
  { label: "Support", icon: PiLifebuoyBold },
];

const Navbar = ({ title = "Dashboard", onToggleSidebar, onNewOrder }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const notifRef = useRef(null);
  const msgRef = useRef(null);
  const profileRef = useRef(null);

  const unreadNotifs = notifications.filter((n) => n.unread).length;
  const unreadMsgs = MESSAGES.filter((m) => m.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(e.target)) {
        setMsgOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotif = () => {
    setNotifOpen((v) => !v);
    setMsgOpen(false);
    setProfileOpen(false);
  };
  const toggleMsg = () => {
    setMsgOpen((v) => !v);
    setNotifOpen(false);
    setProfileOpen(false);
  };
  const toggleProfile = () => {
    setProfileOpen((v) => !v);
    setNotifOpen(false);
    setMsgOpen(false);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, scale: 0.95, y: -8, transition: { duration: 0.12 } },
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_1px_0_rgba(11,31,77,0.04)]">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
           

          <div className="hidden sm:block leading-tight">
            <motion.h1
              key={title}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-bold text-[#0B1F4D] tracking-tight"
            >
              {title}
            </motion.h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Welcome back, Ali👋
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Restaurant Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-700">
              Restaurant Open
            </span>
          </div>

          

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <motion.button onClick={toggleNotif} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#0B1F4D] bg-[#0B1F4D]/5 hover:bg-[#0B1F4D]/10 transition-colors duration-200 group" >
              <motion.span
                whileHover={{ rotate: [0, -15, 12, -8, 4, 0] }}
                transition={{ duration: 0.5 }}
              >
                <PiBellSimpleBold className="text-lg" />
              </motion.span>
              {unreadNotifs > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center shadow" >
                  <motion.span
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    {unreadNotifs}
                  </motion.span>
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-[380px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-top-right z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
                    <div>
                      <h3 className="text-sm font-bold text-[#0B1F4D]">
                        Notifications
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        {unreadNotifs} unread
                      </p>
                    </div>
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-medium text-[#0B1F4D] hover:text-[#D4AF37] transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <motion.div
                          key={n.id}
                          whileHover={{ backgroundColor: "rgba(11,31,77,0.03)" }}
                          className="flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-xl bg-[#0B1F4D]/5 flex items-center justify-center shrink-0 text-[#0B1F4D]">
                            <Icon className="text-base" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                              {n.message}
                            </p>
                            <p className="text-[10px] text-gray-300 mt-0.5 flex items-center gap-1">
                              <PiClockBold /> {n.time}
                            </p>
                          </div>
                          {n.unread && (
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <button className="w-full text-center py-3 text-xs font-semibold text-[#0B1F4D] hover:bg-[#0B1F4D]/5 transition-colors border-t border-gray-50">
                    View All Notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages */}
          <div className="relative" ref={msgRef}>
            <motion.button
              onClick={toggleMsg}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#0B1F4D] bg-[#0B1F4D]/5 hover:bg-[#0B1F4D]/10 transition-colors duration-200"
            >
              <PiChatCircleDotsBold className="text-lg" />
              {unreadMsgs > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-[#0B1F4D] text-[10px] font-bold flex items-center justify-center shadow"
                >
                  {unreadMsgs}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {msgOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-top-right z-50"
                >
                  <div className="px-4 py-3.5 border-b border-gray-50">
                    <h3 className="text-sm font-bold text-[#0B1F4D]">Messages</h3>
                    <p className="text-[11px] text-gray-400">
                      {unreadMsgs} unread conversations
                    </p>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {MESSAGES.map((m) => (
                      <motion.div
                        key={m.id}
                        whileHover={{ backgroundColor: "rgba(11,31,77,0.03)" }}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                      >
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[#0B1F4D] text-white flex items-center justify-center text-xs font-bold">
                            {m.initials}
                          </div>
                          {m.online && (
                            <PiCircleFill className="absolute -bottom-0.5 -right-0.5 text-emerald-400 text-[10px] bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {m.name}
                            </p>
                            <span className="text-[10px] text-gray-300 shrink-0 ml-2">
                              {m.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">
                            {m.preview}
                          </p>
                        </div>
                        {m.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <button className="w-full text-center py-3 text-xs font-semibold text-[#0B1F4D] hover:bg-[#0B1F4D]/5 transition-colors border-t border-gray-50">
                    View All Messages
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative pl-1.5 sm:pl-2.5 ml-0.5" ref={profileRef}>
            <motion.button
              onClick={toggleProfile}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-[#0B1F4D]/5 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0B1F4D] to-[#1c3a75] text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-[#D4AF37]/40">
                AH
              </div>
              <div className="hidden md:block text-left leading-tight">
                <p className="text-xs font-semibold text-gray-800">Ali Hassan</p>
                <p className="text-[10px] text-gray-400">Owner</p>
              </div>
              <PiCaretDownBold
                className={`hidden sm:block text-xs text-gray-400 transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-top-right z-50"
                >
                  <div className="px-5 py-5 bg-gradient-to-br from-[#0B1F4D] to-[#15305f] text-white">
                    <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-[#D4AF37]/60 flex items-center justify-center text-lg font-bold mb-3">
                      JBA
                    </div>
                    <p className="text-sm font-bold">Ali Hassan</p>
                    <p className="text-xs text-white/60">Owner · Janoshi Co.</p>
                    <p className="text-[11px] text-white/40 mt-1">
                      Janoshi By Ali
                    </p>
                  </div>

                  <div className="py-1.5">
                    {PROFILE_MENU.map(({ label, icon: Icon }) => (
                      <motion.button
                        key={label}
                        whileHover={{ x: 3 }}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#0B1F4D]/5 transition-colors group"
                      >
                        <span className="flex items-center gap-3 text-xs font-medium text-gray-700">
                          <Icon className="text-sm text-[#0B1F4D]" />
                          {label}
                        </span>
                        <PiCaretRightBold className="text-[10px] text-gray-300 group-hover:text-[#D4AF37] transition-colors" />
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-gray-50 py-1.5">
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#EF4444] hover:bg-red-50 transition-colors"
                    >
                      <PiSignOutBold className="text-sm" />
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
