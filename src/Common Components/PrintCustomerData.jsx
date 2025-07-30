import React from 'react'
import PageTitle from './PageTitle'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardContent } from '@mui/material';
// import VaPrint from '../Pages/Customer Onboarding/components/VaPrint';

const PrintCustomerData = () => {
    return (
        <div
            sx={{
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "15px",
            }}
        >
            <CardContent>
                <div className="flex items-center gap-6">
                    <PageTitle
                        titleText="Preview"
                        titleIcon={
                            <VisibilityIcon
                                style={{ color: "rgb(0,78,150)", fontSize: "30px" }}
                            />
                        }
                    />
                </div>
                <div className="mt-5">
                    <VaPrint />
                </div>
            </CardContent>
        </div>
    )
}

export default PrintCustomerData