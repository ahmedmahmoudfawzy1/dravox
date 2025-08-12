import React, { useEffect, useRef, useState } from 'react';
import { useGetCurrency } from '../../hooks/useCurrency';
import useAuthStore from '../../store/authStore';
import { useUserInfo } from '../../hooks/useUser';
import useCurrencyStore from '../../store/currencyStore';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import Spinner from '../../components/Loader/Spinner';

export default function EditProfile() {
    const [formData, setFormData] = useState({});



    const { token } = useAuthStore()

    const { data } = useGetCurrency(token)

    const { data: userInfo } = useUserInfo()

    const { currency } = useCurrencyStore()

    const [loading, setLoading] = useState(false)

    const currencySelect = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const phoneNumberRef = useRef(null)

    const handelEditProfile = async (e) => {
        e.preventDefault();
        const formData = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            phone_number: phoneNumberRef.current.value,
            preferred_currency: currencySelect.current.value,
            preferred_language: "en",
        }




        setLoading(true)

        try {
            const res = await fetch("https://api.getdravox.com/api/v0.1/account/user/profile/", {
                method: "PATCH",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            console.log(data);

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }





    return (
        <div className="min-h-screen bg-[#0B0B0B] relative overflow-hidden pt-24">

            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='circuit' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%23FF1E1E' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23FF1E1E' opacity='0.5'/%3E%3Ccircle cx='90' cy='10' r='2' fill='%23FF1E1E' opacity='0.5'/%3E%3Ccircle cx='90' cy='90' r='2' fill='%23FF1E1E' opacity='0.5'/%3E%3Ccircle cx='10' cy='90' r='2' fill='%23FF1E1E' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23circuit)'/%3E%3C/svg%3E")`
                }} />
            </div>

            {/* Animated Gradient Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF1E1E] opacity-10 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D30000] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent opacity-50" />
                        <h1 className="text-4xl font-black text-white uppercase tracking-wider">
                            Edit Profile
                        </h1>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent opacity-50" />
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-[#0B0B0B] border border-[#FF1E1E]/30 rounded-2xl shadow-[0_0_30px_rgba(255,30,30,0.1)] overflow-hidden">

                    {/* Form Content */}
                    <div className="p-8">
                        <form className="space-y-6" onSubmit={handelEditProfile}>
                            {/* Name Fields Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="group">
                                    <label className="block text-[#A1A1A1] text-sm font-semibold uppercase tracking-wider mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={userInfo?.first_name}
                                            className="w-full px-4 py-3 bg-[#0B0B0B] border border-[#A1A1A1]/20 rounded-lg text-white placeholder-[#A1A1A1]/50 focus:outline-none focus:border-[#FF1E1E] transition-all duration-300 group-hover:border-[#FF1E1E]/50"
                                            placeholder="Enter first name"
                                            ref={firstNameRef}
                                        />
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF1E1E] to-[#D30000] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="group">
                                    <label className="block text-[#A1A1A1] text-sm font-semibold uppercase tracking-wider mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={userInfo?.last_name}
                                            ref={lastNameRef}
                                            className="w-full px-4 py-3 bg-[#0B0B0B] border border-[#A1A1A1]/20 rounded-lg text-white placeholder-[#A1A1A1]/50 focus:outline-none focus:border-[#FF1E1E] transition-all duration-300 group-hover:border-[#FF1E1E]/50"
                                            placeholder="Enter last name"
                                        />
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF1E1E] to-[#D30000] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="group">
                                <label className="block text-[#A1A1A1] text-sm font-semibold uppercase tracking-wider mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A1]">
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <input
                                        type="tel"
                                        defaultValue={userInfo?.phone_number}
                                        ref={phoneNumberRef}
                                        className="w-full pl-12 pr-4 py-3 bg-[#0B0B0B] border border-[#A1A1A1]/20 rounded-lg text-white placeholder-[#A1A1A1]/50 focus:outline-none focus:border-[#FF1E1E] transition-all duration-300 group-hover:border-[#FF1E1E]/50"
                                        placeholder="Enter phone number"
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF1E1E] to-[#D30000] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
                                </div>
                            </div>

                            {/* Currency and Language Row */}
                            <div className="w-full">
                                {/* Preferred Currency */}
                                <div className="group">
                                    <label className="block text-[#A1A1A1] text-sm font-semibold uppercase tracking-wider mb-2">
                                        Preferred Currency <span className="text-[#FF1E1E] text-lg font-bold">{currency}</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            ref={currencySelect}
                                            className="w-full px-4 py-3 bg-[#0B0B0B] border border-[#A1A1A1]/20 rounded-lg text-white focus:outline-none focus:border-[#FF1E1E] transition-all duration-300 group-hover:border-[#FF1E1E]/50 appearance-none cursor-pointer"
                                        >
                                            {data?.map(currency => (
                                                <option key={currency?.code} value={currency?.decimal_places} className="bg-[#0B0B0B]">
                                                    {currency?.symbol} {currency?.code} - {currency?.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A1A1A1]">
                                            <IoIosArrowDown />

                                        </div>
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF1E1E] to-[#D30000] opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />
                                    </div>
                                </div>


                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 ">
                                {/* Save Button */}
                                <button
                                    type="submit"
                                    className=" main-btn p-3 text-white   rounded-lg "
                                >
                                    {loading ? <Spinner /> : "SAVE CHANGES"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}