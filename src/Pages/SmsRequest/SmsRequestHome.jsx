import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmsRequestHome = () => {
  const navigate = useNavigate();

  const cardData = [
    { id: 1, title: "SMS Opt-In/Opt-out", bgColor: "bg-blue-100/50 border border-blue-300", route: "/smsweb/backofficeuser/smsrequest" },
    { id: 2, title: "Update Mobile Number", bgColor: "bg-green-100/50 border border-green-300", route: "/smsweb/backofficeuser/smsrequest" },
    { id: 3, title: "Mobile Block/Unblock", bgColor: "bg-amber-100/50 border border-amber-300/30", route: "/smsweb/backofficeuser/smsrequest" },
    { id: 4, title: "View Logs", bgColor: "bg-purple-100/50 border border-purple-300", route: "/smsweb/backofficeuser/smsrequest" },
    { id: 5, title: "SMS M-Pin Generation", bgColor: "bg-slate-100/50 border border-slate-300", route: "/smsweb/backofficeuser/smsrequest" },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="p-8">
        <p className="font-semibold text-lg bg-gray-200 text-black-800 px-3 py-[6px] rounded-full inline-block mb-3">
        Select SMS Request Types
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`${card.bgColor} rounded-lg p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-[rgb(148,25,20)]`}
            onClick={() => handleCardClick(card.route)}
          >
            <h2 className="text-xl font-semibold group-hover:text-[rgb(148,25,20)] transition-colors duration-300">{card.title}</h2>
            <p className="mt-2 group-hover:text-[rgb(148,25,20)] transition-colors duration-300">Click to proceed</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmsRequestHome;