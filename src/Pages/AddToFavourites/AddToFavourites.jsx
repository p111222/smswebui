
// import { Card, CardContent, IconButton, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import PageTitle from "../../Common Components/PageTitle";
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import StarIcon from '@mui/icons-material/Star';
// import { FavoritesContext } from "../../Store/FavoritesContext";
// import { useContext } from "react";

// const AddToFavourites = () => {
//     const navigate = useNavigate();
//     const { favorites, toggleFavorite } = useContext(FavoritesContext); 

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
//         },
//         {
//             title: "SMS View Log",
//             description: "View the sms logs here",
//             icon: "📨",
//             color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//             path: "/smsweb/branchuser/smsviewlog"
//         }
//     ];

//     return (
//         <Card sx={{
//             padding: '16px',
//             borderRadius: '16px',
//             boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
//             backgroundColor: 'rgba(255, 255, 255, 0.5)',
//             backdropFilter: 'blur(10px)'
//         }}>
//             <PageTitle
//                 titleText="Add To Favourites"
//                 titleIcon={
//                     <StarIcon
//                         style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
//                     />
//                 }
//             />
//             <hr className="mt-3" />

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-3 gap-6">
//                 {services.map((service, index) => {
//                     const isFavorite = favorites.some(fav => fav.path === service.path);
//                     return (
//                         <Card
//                             key={index}
//                             onClick={() => navigate(service.path)}
//                             sx={{
//                                 minHeight: '200px',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 textAlign: 'center',
//                                 cursor: 'pointer',
//                                 transition: 'all 500ms cubic-bezier(0.25,0.1,0.25,1)',
//                                 borderRadius: '16px',
//                                 boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
//                                 '&:hover': {
//                                     boxShadow: '0px 10px 15px rgba(0,0,0,0.1)',
//                                     transform: 'translateY(-8px)'
//                                 },
//                                 border: '1px solid rgba(255, 255, 255, 0.2)',
//                                 overflow: 'hidden',
//                                 background: service.color,
//                                 position: 'relative'
//                             }}
//                         >
//                             <IconButton
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     toggleFavorite(service);
//                                 }}
//                                 sx={{
//                                     position: 'absolute',
//                                     top: 8,
//                                     right: 8,
//                                     color: isFavorite ? 'gold' : 'rgba(255,255,255,0.7)',
//                                     backgroundColor: 'rgba(0,0,0,0.2)',
//                                     '&:hover': {
//                                         backgroundColor: 'rgba(0,0,0,0.3)',
//                                         color: isFavorite ? 'gold' : 'white'
//                                     },
//                                     transition: 'all 0.3s ease'
//                                 }}
//                             >
//                                 {isFavorite ? (
//                                     <StarIcon fontSize="small" />
//                                 ) : (
//                                     <StarBorderIcon fontSize="small" />
//                                 )}
//                             </IconButton>

//                             <CardContent sx={{
//                                 width: '100%',
//                                 padding: '24px'
//                             }}>
//                                 <div className="w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center mb-5 mx-auto backdrop-blur-sm border border-white/10">
//                                     <span className="text-3xl">{service.icon}</span>
//                                 </div>
//                                 <Typography
//                                     variant="h6"
//                                     sx={{
//                                         marginBottom: '8px',
//                                         color: 'white',
//                                         fontWeight: 600,
//                                         letterSpacing: '0.5px'
//                                     }}
//                                 >
//                                     {service.title}
//                                 </Typography>
//                                 <Typography
//                                     variant="body2"
//                                     sx={{
//                                         color: 'rgba(255, 255, 255, 0.8)',
//                                         fontSize: '0.875rem',
//                                         lineHeight: 1.4
//                                     }}
//                                 >
//                                     {service.description}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     );
//                 })}
//             </div>
//         </Card>
//     );
// };

// export default AddToFavourites;



import { Card, CardContent, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../Common Components/PageTitle";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { FavoritesContext } from "../../Store/FavoritesContext";
import { useContext } from "react";
import { AuthStore } from "../../Store/authStore"; 

const AddToFavourites = () => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const { user } = useContext(AuthStore);

    const allServices = [
        {
            title: "SMS Opt-In/Out",
            description: "Manage customer SMS subscription preferences",
            icon: "📩",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            path: "/smsweb/branchuser/smsoptinout",
            requiredPermission: "SMS Opt-In/Out"
        },
        {
            title: "SMS Block Lift",
            description: "Remove SMS blocking for customers",
            icon: "🔓",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            path: "/smsweb/branchuser/smsblocklift",
            requiredPermission: "SMS Block Lift"
        },
        {
            title: "Phone Number Addition",
            description: "Add additional contact numbers for customers",
            icon: "📱",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            path: "/smsweb/branchuser/phonenumberaddition",
            requiredPermission: "Phone Number Addition"
        },
        {
            title: "MPIN Generation",
            description: "Create and manage customer MPINs",
            icon: "🔑",
            color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            path: "/smsweb/branchuser/mpingeneration",
            requiredPermission: "Mpin Generation"
        },
        {
            title: "SMS View Log",
            description: "View the sms logs here",
            icon: "📨",
            color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
            path: "/smsweb/branchuser/smsviewlog",
            requiredPermission: "SMS View Log"
        },
        // {
        //     title: "Task Board",
        //     description: "Manage and track your tasks",
        //     icon: "📋",
        //     color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        //     path: "/smsweb/branchuser/taskboard",
        //     requiredPermission: "Task Board"
        // },
        // {
        //     title: "Approval Audit Log",
        //     description: "View approval history and audit trails",
        //     icon: "📊",
        //     color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
        //     path: "/smsweb/branchuser/approvalauditlog",
        //     requiredPermission: "Approval Audit Log"
        // },
        // {
        //     title: "Customer Approved Records",
        //     description: "Access customer approved records",
        //     icon: "✅",
        //     color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        //     path: "/smsweb/branchuser/customerapprovedrecords",
        //     requiredPermission: "Customer Approved Records"
        // }
    ];

    // Filter services based on user's page access permissions
    const filteredServices = allServices.filter(service => {
        // Check if user has access to this service
        // Using allPageAccess from your JWT payload which includes all roles
        return user?.allPageAccess?.includes(service.requiredPermission);
    });

    // If no services are accessible, show a message
    if (filteredServices.length === 0) {
        return (
            <Card sx={{
                padding: '16px',
                borderRadius: '16px',
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <PageTitle
                    titleText="Add To Favourites"
                    titleIcon={
                        <StarIcon
                            style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
                        />
                    }
                />
                <hr className="mt-3 w-full" />
                
                <Typography variant="h6" sx={{ mt: 4, color: 'text.secondary' }}>
                    No services available for your account
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Please contact your administrator for access permissions.
                </Typography>
            </Card>
        );
    }

    return (
        <Card sx={{
            padding: '16px',
            borderRadius: '16px',
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)'
        }}>
            <PageTitle
                titleText="Add To Favourites"
                titleIcon={
                    <StarIcon
                        style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
                    />
                }
            />
            <hr className="mt-3" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-3 gap-6">
                {filteredServices.map((service, index) => {
                    const isFavorite = favorites.some(fav => fav.path === service.path);
                    return (
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
                                background: service.color,
                                position: 'relative'
                            }}
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(service);
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: isFavorite ? 'gold' : 'rgba(255,255,255,0.7)',
                                    backgroundColor: 'rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        color: isFavorite ? 'gold' : 'white'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {isFavorite ? (
                                    <StarIcon fontSize="small" />
                                ) : (
                                    <StarBorderIcon fontSize="small" />
                                )}
                            </IconButton>

                            <CardContent sx={{
                                width: '100%',
                                padding: '24px'
                            }}>
                                <div className="w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center mb-5 mx-auto backdrop-blur-sm border border-white/10">
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
                    );
                })}
            </div>
        </Card>
    );
};

export default AddToFavourites;