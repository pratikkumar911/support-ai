'use client'

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function DashboardClient({ownerId}:{ownerId: string}) {
    const navigate = useRouter();

    return (
        <div className="min-h-screen bg-zinc text-zinc-900">
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
                className="fixed left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-lf font-semibold tracking-tight" onClick={() => navigate.push("/")}>Support <span className="text-zinc-400">AI</span></div>
                    <button className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition">Embed Chatbot</button>
                </div>
            </motion.div>
            <div className="flex justify-center px-4 py-14">
                <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10">
                    <div className="mb-10">
                        <h1 className="text-2xl font-semibold">Chatbot Settings</h1>
                        <p className="text-zinc-500 mt-1">Manage your AI chatbot knowledge and business details</p>
                    </div>
                    <div className="mb-10">
                        <h1 className="">Business Details</h1>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default DashboardClient