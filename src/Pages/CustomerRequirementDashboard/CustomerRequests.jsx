// import { Card, CardContent, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PageTitle from "../../Common Components/PageTitle";
// import PendingActionsIcon from '@mui/icons-material/PendingActions';

// const CustomerRequests = () => {
//     const navigate = useNavigate();

//     const services = [
//         {
//             title: "SMS Opt-In/Out",
//             description: "Manage customer SMS subscription preferences",
//             icon: "📩",
//             color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             path: "/smsweb/branchuser/smsoptinout"
//         },
//         {
//             title: "SMS Block Lift",
//             description: "Remove SMS blocking for customers",
//             icon: "🔓",
//             color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//             path: "/smsweb/branchuser/smsblocklift"
//         },
//         {
//             title: "Phone Number Addition",
//             description: "Add additional contact numbers for customers",
//             icon: "📱",
//             color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//             path: "/smsweb/branchuser/phonenumberaddition"
//         },
//         {
//             title: "MPIN Generation",
//             description: "Create and manage customer MPINs",
//             icon: "🔑",
//             color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//             path: "/smsweb/branchuser/mpingeneration"
//         }
//     ];

//     return (
//         <Card className="p-2 rounded-2xl shadow-lg bg-white/50 backdrop-blur-sm">

//             <PageTitle
//                 titleText="Customer Requests"
//                 titleIcon={
//                     <PendingActionsIcon
//                         style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
//                     />
//                 }
//             />
//             <hr className="mt-3" />

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-3 gap-6">
//                 {services.map((service, index) => (
//                     <Card
//                         key={index}
//                         onClick={() => navigate(service.path)}
//                         className="min-h-[200px] flex flex-col justify-center items-center text-center cursor-pointer 
//                                   transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
//                                   rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2
//                                   border border-white/20 overflow-hidden"
//                         style={{ background: service.color }}
//                     >
//                         <CardContent className="w-full p-6">
//                             <div className="w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center mb-5 mx-auto
//                                           backdrop-blur-sm border border-white/10">
//                                 <span className="text-3xl">{service.icon}</span>
//                             </div>
//                             <Typography
//                                 variant="h6"
//                                 className="mb-2 text-white font-semibold tracking-wide"
//                             >
//                                 {service.title}
//                             </Typography>
//                             <Typography
//                                 variant="body2"
//                                 className="text-white/80 text-sm leading-snug"
//                             >
//                                 {service.description}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </Card>
//     );
// };

// export default CustomerRequests;


import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../Common Components/PageTitle";
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const CustomerRequests = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "SMS Opt-In/Out",
            description: "Manage customer SMS subscription preferences",
            icon: "📩",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            path: "/smsweb/branchuser/smsoptinout"
        },
        {
            title: "SMS Block Lift",
            description: "Remove SMS blocking for customers",
            icon: "🔓",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            path: "/smsweb/branchuser/smsblocklift"
        },
        {
            title: "Phone Number Addition",
            description: "Add additional contact numbers for customers",
            icon: "📱",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            path: "/smsweb/branchuser/phonenumberaddition"
        },
        {
            title: "MPIN Generation",
            description: "Create and manage customer MPINs",
            icon: "🔑",
            color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            path: "/smsweb/branchuser/mpingeneration"
        }
    ];

    return (
        <Card sx={{
            padding: '16px',
            borderRadius: '16px',
            // boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)'
        }}>
            <PageTitle
                titleText="Customer Requests"
                titleIcon={
                    <PendingActionsIcon
                        style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
                    />
                }
            />
            <hr className="mt-3" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-3 gap-6">
                {services.map((service, index) => (
                    <Card
                        key={index}
                        onClick={() => navigate(service.path)}
                        sx={{
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 500ms cubic-bezier(0.25,0.1,0.25,1)',
                            borderRadius: '16px',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                            '&:hover': {
                                boxShadow: '0px 10px 15px rgba(0,0,0,0.1)',
                                transform: 'translateY(-8px)'
                            },
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            overflow: 'hidden',
                            background: service.color
                        }}
                    >
                        <CardContent sx={{
                            width: '100%',
                            padding: '24px'
                        }}>
                            <div className="w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center mb-5 mx-auto
                                          backdrop-blur-sm border border-white/10">
                                <span className="text-3xl">{service.icon}</span>
                            </div>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: '8px',
                                    color: 'white',
                                    fontWeight: 600,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4
                                }}
                            >
                                {service.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export default CustomerRequests;