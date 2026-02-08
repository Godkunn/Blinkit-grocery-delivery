import React, { useState } from 'react';
import { UserProfile, Address } from '../types';
import { MapPin, Briefcase, Plus, LogOut, Phone, Mail, User, Edit2, Check } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onLogout: () => void;
  onAddAddress: () => void;
  onEditAddress: (addr: Address) => void;
  onUpdateProfile: (u: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onAddAddress, onEditAddress, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const saveProfile = () => {
    onUpdateProfile(tempUser);
    setIsEditing(false);
  };

  return (
    <div className="pb-24 animate-slide-in">
        <div className="bg-white p-6 mb-4 shadow-sm relative">
            {isEditing ? (
                <div className="space-y-3">
                    <input 
                        value={tempUser.name}
                        onChange={e => setTempUser({...tempUser, name: e.target.value})}
                        className="w-full border p-2 rounded text-lg font-bold"
                        placeholder="Your Name"
                    />
                    <input 
                        value={tempUser.phone}
                        onChange={e => setTempUser({...tempUser, phone: e.target.value})}
                        className="w-full border p-2 rounded text-sm text-slate-500"
                        placeholder="Phone"
                    />
                     <input 
                        value={tempUser.email}
                        onChange={e => setTempUser({...tempUser, email: e.target.value})}
                        className="w-full border p-2 rounded text-sm text-slate-500"
                        placeholder="Email"
                    />
                    <button onClick={saveProfile} className="bg-brand-green text-white px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                        <Check size={14}/> Save
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-xl font-bold mb-1">{user.name || 'Guest User'}</h1>
                    <div className="flex flex-col text-slate-500 text-sm gap-1 mt-2">
                        <span className="flex items-center gap-2"><Phone size={14}/> {user.phone}</span>
                        <span className="flex items-center gap-2"><Mail size={14}/> {user.email}</span>
                    </div>
                    <button onClick={() => { setTempUser(user); setIsEditing(true); }} className="absolute top-6 right-6 text-brand-green font-bold text-sm flex items-center gap-1">
                        <Edit2 size={14} /> Edit
                    </button>
                </>
            )}
        </div>

        <div className="px-4">
             <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">My Addresses</h3>
             <div className="space-y-3">
                 {user.addresses.map((addr) => (
                     <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-brand-green transition-colors group relative">
                        <div className="flex items-start gap-3">
                            <div className="bg-brand-gray p-2 rounded-lg text-slate-600 shrink-0">
                                {addr.type === 'Work' ? <Briefcase size={20}/> : <MapPin size={20}/>}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                    {addr.type} 
                                    {addr.isDefault && <span className="bg-green-100 text-brand-green text-[10px] px-1.5 rounded">DEFAULT</span>}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{addr.flat}, {addr.line1}</p>
                                <p className="text-xs text-slate-500 line-clamp-1">{addr.line2}</p>
                            </div>
                            <button 
                                onClick={() => onEditAddress(addr)}
                                className="p-2 text-slate-400 hover:text-brand-green"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>
                     </div>
                 ))}
                 
                 <button 
                    onClick={onAddAddress}
                    className="w-full py-3 border-2 border-dashed border-brand-green text-brand-green rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-50"
                >
                    <Plus size={16} />
                    Add New Address
                </button>
             </div>
        </div>

        <div className="px-4 mt-8">
             <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Settings</h3>
             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button 
                    onClick={onLogout}
                    className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 text-red-600 font-medium"
                >
                    <span className="flex items-center gap-3">
                        <LogOut size={20} />
                        Log Out
                    </span>
                </button>
             </div>
        </div>
        
        <div className="text-center mt-10 text-slate-400 text-xs pb-10">
            <p className="font-semibold mb-1">Blinkit Clone v1.2.0</p>
            <p className="text-brand-green animate-pulse font-medium">Made with ❤️ by Ayush Chaudhary</p>
        </div>
    </div>
  );
};