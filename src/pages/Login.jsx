import { useState } from "react";
import { motion } from "framer-motion";
import { PiEnvelopeSimpleBold, PiLockKeyBold, PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import Logo from "../components/common/Logo";
import { Button } from "../components/common/UIKit";

const Login = ({ onLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("manager@janoshi.pk");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex bg-[#F4F5F7]">
      <div className="hidden lg:flex flex-1 bg-[#0B1F4D] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#C9A227]/10 blur-3xl" />
        <div className="relative max-w-md">
          <Logo dark size={52} />
          <h2 className="font-display text-4xl font-semibold text-white mt-10 leading-tight">
            Every order,<br />table, and rupee —<br /><span className="text-[#E4C766]">one command center.</span>
          </h2>
          <p className="text-white/50 text-sm mt-5 leading-relaxed">
            The operating system built for Janoshi Okara — from the kitchen board to the cash drawer.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
          <div className="lg:hidden flex justify-center mb-8"><Logo size={48} /></div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-2">Welcome back</p>
          <h1 className="font-display text-2xl font-semibold text-[#0B1F4D] mb-8">Sign in to your dashboard</h1>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Email Address</label>
              <div className="relative">
                <PiEnvelopeSimpleBold className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-[#0B1F4D]/40" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Password</label>
              <div className="relative">
                <PiLockKeyBold className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-3 text-sm outline-none focus:border-[#0B1F4D]/40"
                />
                <button onClick={() => setShowPass((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <PiEyeSlashBold size={16} /> : <PiEyeBold size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-gray-500"><input type="checkbox" defaultChecked /> Remember me</label>
              <span className="text-[#C9A227] font-semibold cursor-pointer">Forgot password?</span>
            </div>
            <Button size="lg" className="w-full" onClick={onLogin}>Sign In</Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-8">© 2026 Janoshi Restaurant · Okara, Pakistan</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
