export const CONSTANTS = {
  PHONE_NUMBER_PATTERN: /^[0-9]{10}$/,
  CUSTOMERID_PATTERN: /^$|^[0-9]+$/,
  CLIENTCODE_PATTERN: /^$|^[a-zA-Z0-9]+$/,
  SINGLENUMERIC_PATTERN: /^$|^(1|3|4|5|6|7|8|9|10)$/,
  CHARGES_PATTERN1: /^$|^(?:\d{1,7}(\.\d{1,2})?)$/,
  CHARGES_PATTERN: /^$|^[0-9.]*$/,
  SPECIAL_CHAR_REGEX: /^[!@#$%^&*(),;.'?":{}|<>~`_\-+=\\[\]/]$/,
  EMAIL_ID: /^[a-zA-Z0-9_]*$/,
  EMAIL_ID_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MAXLEN_5: /^[0-9]{0,5}$/,
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_~\(\)\[\]\{\}-])[A-Za-z\d@$!%*?&^#_~\(\)\[\]\{\}-]{8,}$/,
  REQUESTID_PATTERN: /^$|^[a-zA-Z0-9]{36}$/,
  SUBCODE_PATTERN: /^$|^[a-zA-Z0-9]+$/,
  URL_PATTERN: /^$|^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/,
  REMITTERAC_PATTERN: /^[a-zA-Z0-9]{3,40}$/,
  REMITTERNAME_PATTERN: /^[A-Za-z0-9\-@#&*()/:.,'; ]{1,100}$/,
  REMITTERIFSC_PATTERN: /^[A-Za-z0-9]{4}0[A-Za-z0-9]{6}$/,
  CLIENTCODE_PATTERN_VA: /^[a-zA-Z0-9]{6,10}$/,
  VIRTUAL_ACCTNO_PATTERN: /^[a-zA-Z0-9]{6,40}$/,
  MASTER_ACCTNO_PATTERN: /^[a-zA-Z0-9]{14}$/,
  STATUS_FLG_PATTERN: /^(ACTIVE|INACTIVE)$/,
  REQUEST_TYPE_PATTERN: /^(NEW|MOD|DCT|ACT)$/,
  CHANNEL_PATTERN: /^(UI)$/,
  REMITTER_INFO_PATTERN: /^[a-zA-Z0-9 ,]{0,500}$/,
  REMITTEREMAIL_PATTERN: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,1000}$/,
  REMITTERMOBILE_PATTERN: /^\d{10}$/,
  AMOUNT_PATTERN: /^[0-9.]+$/,
  NAME_PATTERN: /^$|^[a-zA-Z ]+$/,
  URL_REGEX: /^(https:\/\/)(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?$/,
  VA_AMOUNT_FIELDS: ["minBillAmtBeforeDD", "maxBillAmtBeforeDD", "minBillAmtAfterDD", "maxBillAmtAfterDD"],
  VA_HEADERS: ["requestId", "clientCode", "subCode", "remitterCode", "virtualAcc", "masterAcc", "channel", "requestType", "vaStatus", "vaActivationDate", "vaExpiryDate", "billDueDate", "minBillAmtBeforeDD", "maxBillAmtBeforeDD", "minBillAmtAfterDD", "maxBillAmtAfterDD", "remitterName", "remitterAcc", "remitterIFSC", "remitterMobileNo", "remitterEmailID", "remitterInfo"],
  VA_BODY: ["e652fc52-65d9-45d1-9dff-05dc488cf30f", "RELPET", "MUMBAI", "MANGAT1334", "RELPETMUMBAIMANGAT1334", "97750741083647", "UI", "NEW", "ACTIVE", "17-08-2024", "17-08-2025", "15-02-2024", "1100.44", "1105.22", "1200.44", "1300.44", "Dealerxx", "xxxxxxxxxx", "xxxxxxxx123", "999xxxxxxx", "dealer@email.com", "sample info xyz, sample info abc"],
  PREVETN_CHAR_REGEX: /[+=-@]/,
  PREVETN_SPEC_CHAR_REGEX : /[!@#$%^&*(),.?":{}|_<>+=\-/\\[\]`~;']/
};


export const genericEmails = ["gmail", "federalbank", "federal", "yahoo", "outlook"]

// Mis
export const leftUploadTemplate = [
  "Client Code",
  "Subcode",
  "Due Date",
  "Validation Max",
  "Validation Min",
  "Email",
  "Mobile Number",
]

// Charges Page
export const MAINTENANCE_FREQ_OPTIONS = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "quarterly",
    label: "Quarterly",
  },
  {
    value: "annually",
    label: "Annually",
  },
];
export const CHARGE_COLLECTION = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "quarterly",
    label: "Quarterly",
  },
  {
    value: "annaully",
    label: "Annually",
  },
];
export const CHARGE_COLL_OPTIONS = [
  { label: "Per Transaction", value: "Per Transaction" },
  { label: "Per '000 INR", value: "Per '000 INR" },
];

// Reports
export const reportsLeftColumn = [
  "Channel Type",
  "Actual Account",
  "Remitter Name",
  "Remitter IFSC",
  "Remitter Email",
  "Remitter Account",
  "Transactin Remarks",
  "Transaction Status",
  "CBS Posted Date",
];
export const reportsRightColumn = [
  "Date-Timestamp",
  "Virtual Account",
  "Transaction Amount",
  "Mode of Collection",
  "Tran ID",
  "Sub Code",
  "Remitter Code",
];

// User Managemenmt
export const roleOptions = [
  { value: "backOfficeUser", label: "Back Office User" },
  // { value: "branchMaker", label: "Branch Maker" },
  // { value: "itSupport", label: "IT Support" },
  { value: "grievanceRedressal", label: "Grievance Redressal" },
];

export const grievanceRedressal = ["Grievance Redressal"];

export const branchMaker = ["Branch Module for Cash and Cheque"];

export const backOfficeUser = [
  "Dashboard",
  "Customer Onboarding",
  "VA Maintenance",
  "Reconciliation",
  "Approval Audit Log",
  "Support",
];

export const itSupport = ["IT Support"];

// Corporate
export const corporateModules = [
  "Dashboard",
  "VA Creation",
  "Reports",
  "VA Maintenance",
  "API Audit Log",
  "Support",
];

export const allPages = [
  "Dashboard",
  "Customer Onboarding",
  "VA Maintenance",
  "API Audit Log",
  "Reconciliation",
  "Branch Module for Cash and Cheque",
  "Approval Audit Log",
  "Support",
];

// Va Maintanance
export const sampleFileData =
  "requestId,clientCode,subCode,remitterCode,virtualAcc,masterAcc,channel,requestType,vaStatus,vaActivationDate,vaExpiryDate,billDueDate,minBillAmtBeforeDD,maxBillAmtBeforeDD,minBillAmtAfterDD,maxBillAmtAfterDD,remitterName,remitterAcc,remitterIfsc,remitterEmailId,remitterMobNo,remitterInfo\n" +
  "1112,CRICKET,CALICUT123,,CRICKETCALICUT123990,10010200152244,,NEW,ACTIVE,01-01-2025,01-05-2025,01-02-2025,100,120,50,150,John Doe,123457000000000,ABCD0123456X,johndoe@example.com,9876543210,Detail1\n" +
  "1113,CRICKET,THRISSUR12,,CRICKETTHRISSUR12991,10010200152244,,NEW,ACTIVE,01-02-2025,01-06-2025,01-02-2025,200,250,75,300,Alice Smith,234568000000000,EFGH0123456Y,alicesmith@example.com,8765432109,DetailA\n" +
  "1114,CRICKET,THRISSUR12,,CRICKETTHRISSUR12992,10010200152244,,NEW,ACTIVE,01-03-2025,01-07-2025,01-02-2025,150,180,60,200,Bob Brown,345679000000000,ijkl0123456Z,bobbrown@example.com,7654321098,DetailX\n" +
  "1115,CRICKET,KANNUR1234,,CRICKETKANNUR1234993,10010200152244,,NEW,ACTIVE,01-04-2025,01-08-2025,01-02-2025,250,300,100,350,Carol Jones,456789000000000,JKLM0123456A,caroljones@example.com,6543210987,DetailPP\n" +
  "1116,CRICKET,KANNUR1234,,CRICKETKANNUR1234994,10010200152244,,NEW,ACTIVE,01-05-2025,01-09-2025,01-02-2025,300,350,125,400,David White,567890000000000,NOPQ0123456B,davidwhite@example.com,5432109876,Detail111"

export const VACOLDESC = [
  ["Column Name", "Specification", "Sample Data"],
  ["requestId", "Min: 36, Max:36,Alphanumeric ([A-Z], [a-z], [0-9]), [hyphen ‘-’]", "e652fc52-65d9-45d1-9dff-05dc488cf30f"],
  ["clientCode", "Min: 6, Max:10,Alphanumeric ([A-Z], [a-z], [0-9])", "RELPET"],
  ["subCode", "Min: 3, Max:10,Alphanumeric ([A-Z], [a-z], [0-9])", "MUMBAI"],
  ["remitterCode", "Min: 3, Max:10,Alphanumeric ([A-Z], [a-z], [0-9])", "MANGAT1334"],
  ["virtualAcc", "Min: 6, Max:40,Alphanumeric ([A-Z], [a-z], [0-9])", "RELPETMUMBAIMANGAT1334"],
  ["masterAcc", "Min: 14, Max:14,Numeric ([0-9])", "97750741083647"],
  ["channel", "Min: 2, Max: 3,API, H2H or UI", "API"],
  ["requestType", "Min: 3, Max: 3, NEW - Add new virtual account, MOD - Modify existing virtual account DCT - Deactivate existing virtual account ACT - Activate Existing virtual account", "NEW"],
  ["vaStatus", "ACTIVE - VA is Activated,INACTIVE - VA is de-activated", "ACTIVE"],
  ["vaActivationDate", "DD-MM-YYYY", "17-08-2024"],
  ["vaExpiryDate", "DD-MM-YYYY", "17-08-2025"],
  ["billDueDate", "DD-MM-YYYY", "15-02-2024"],
  ["minBillAmtBeforeDD", "11 digits + 2 decimals,Numeric [0-9]", "1100.44"],
  ["maxBillAmtBeforeDD", "11 digits + 2 decimals,Numeric [0-9]", "1105.22"],
  ["minBillAmtAfterDD", "11 digits + 2 decimals,Numeric [0-9]", "1200.44"],
  ["maxBillAmtAfterDD", "11 digits + 2 decimals,Numeric [0-9]", "1300.44"],
  ["remitterName", "Min: 1, Max:100, Alphanumeric and Special Characters ([A-Z], [a-z], [0-9],[-_@#&*()/:.,';<>] )", "Dealerxx"],
  ["remitterAcc", "Min: 3, Max:40,Alphanumeric ([A-Z], [a-z], [0-9])", "xxxxxxxxxx"],
  ["remitterIFSC", "Min:11, Max: 11,,Alphanumeric ([A-Z], [a-z], [0-9])", "xxxxxxxx123"],
  ["remitterMobileNo", "Min:10, Max: 10, Numeric [0-9]", "999xxxxxxx"],
  ["remitterEmailID", "Min:1, Max: 1,000,Alphanumeric and Special Characters ([A-Z], [a-z], [0-9], [@,.&*_-])", "dealer@email.com"],
  ["remitterInfo", "Min: 1, Max:500,Alphanumeric ([A-Z], [a-z], [0-9]),<>", "sample info xyz, sample info abc"]
]

export const typeOfConcernOptions = [
  { value: "technical", label: "Technical" },
  { value: "functional", label: "Functional" },
  { value: "feedback", label: "Feedback" },
]


// Datagrid Header
export const operatorOptionsForNumber = [
  { value: "=", label: "Equals" },
  { value: ">", label: "Greater Than" },
  { value: "<", label: "Less Than" },
];

export const operatorOptionsForString = [
  { value: "&&", label: "Contains" },
  { value: "!&", label: "Does not contain" },
  { value: "^", label: "Starts with" },
  { value: "$", label: "Ends with" },
];
export const operatorOptionsForTaskType = [
  { value: "Modify Setup", label: "Modify Setup" },
  { value: "New Setup", label: "New Setup" },
  { value: "VA File Upload", label: "VA File Upload" },
  { value: "Corp Deactivation", label: "Corp Deactivation" },
  { value: "Corp Activation", label: "Corp Activation" },
  { value: "Clarification", label: "Clarification" },
  { value: "Reconciliation", label: "Reconciliation" },
];
export const operatorOptionsForConcern = [
  { value: "Technical", label: "Technical" },
  { value: "Functional", label: "Functional" },
  { value: "Feedback", label: "Feedback" },
];
export const operatorOptionsForTicketStatus = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
];

export const pendingTaskStatus = [
  { value: "RETURNFORCLARIFICATION", label: "RETURNFORCLARIFICATION" },
  { value: "SENDFORAPPROVAL", label: "SENDFORAPPROVAL" },
  { value: "PENDING", label: "PENDING" },
];


export const approvalHistoryStatus = [
  { value: "APPROVED", label: "APPROVED" },
  { value: "REJECTED", label: "REJECTED" },
  { value: "PENDING", label: "PENDING" },
];

export const vaStatus = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Expired", label: "Expired" },
];
export const operatorOptionsForRole = [
  { value: "backOfficeUser", label: "backOfficeUser" },
  { value: "grievanceRedressal", label: "grievanceRedressal" },
  { value: "itSupport", label: "itSupport" },
];
export const requestTypeRole = [
  { value: "CREATE", label: "CREATE" },
  { value: "UPDATE", label: "UPDATE" },
  { value: "ACTIVATE", label: "ACTIVATE" },
  { value: "DEACTIVATE", label: "DEACTIVATE" },
];

// Displayed Columns
export const pendingColumns = [
  "Task ID",
  "Date-Timestamp",
  "Task Type",
  "Client Code",
  "Customer Name",
  "Maker",
  "Status",
]
export const searchSetupColumns = [
  "Client Code",
  "Customer Name",
  "Customer ID",
  "Maker",
  "Checker",
  "Master Account Number",
  "Created On",
  "Last Modified On",
  "Status",
]
export const vaMaintenanceColumns = [
  "Client Code",
  "Sub Code",
  "Remitter Code",
  "Virtual Account",
  "Created On",
  "Last Modified On",
  "Status",
]

export const approveHistoryColumn = [
  "Task ID",
  "Date-Timestamp",
  "Task Type",
  "Client Code",
  "Customer Name",
  "Maker",
  "Checker",
  "Remark",
  "Status",
]

export const supportColumn = [
  "Ticket ID",
  "Type of Concern",
  "Subject",
  "Created On",
  "Modified On",
  "Status",
]

export const grievanceColumn = [
  "Ticket ID",
  "Client Code",
  "Type of Concern",
  "Subject",
  "Created On",
  "Modified On",
  "Created By",
]

export const userManagementColumn = [
  "Name",
  "Login ID",
  "Role",
  "Created On",
  "Last Modified On",
  "Last Login",
  "Status",
]

export const pendingUserColumn = [
  "Login ID",
  "Request Type",
  "Created On",
  "Created By",
  "Status",
]



// Mis Standard Template column
export const misStandardTemplate = "ClientCode,tranUID,vaAccount,tranAmount,modeOfPay,transRemarks,tranStatus,tranParticulars,tranDate,remitterAcc,remitterName,remitterIFSC,remitterMMID,remitterVPA,remitterMob,remitterInfo"