exports.MESSAGES = {
  ERROR: {
    INVALID_REQ: 'Invalid parameters sent',
    INVALID_USER: 'User does not exits with this email,Go for signup',
    INVALID_PASSWORD: 'Please enter the correct credentials',
    USER_EXITS: 'Already user exits with this email',
    PASSWORD_VALIDATION:
      'Password must be greater than 8 chars with upper,lower,number & special chars; email should be in proper format.',
    INCORRECT_OTP: 'Incorrect OTP please enter again !',
    PASSWORD_MISSMATCH:
      'New Password and Confirm New Password does not match !',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INVALID_DATE_FORMAT: 'Invalid date format',
    INVALID_CREDENTIAL: 'Please enter the correct credentials',
    NO_RESULT_FOUND: 'No result found !',
    INCORRECT_STARTUP_ID: 'Please enter the correct startupId',
    EMPTY_DESCRIPTION: 'Description should not be empty',
    EMPTY_LINK: 'Link should not be empty',
    NO_STARTUP_FOUND: 'No startup found !',
    NO_EVENT_MEETING_FOUND: 'No Event or Meeting found !',
    STARTUP_NOT_FOUND:
      'No startup present under you with startup id which you have provided',
    NO_STARTUP_WITH_EMAIL: 'Startup does not created with your registered mail',
    NO_EMAIL: 'No Email Found!',
    FILE_NOT_EXITS: 'File does not exits with this startup !',
  },

  INFO: {
    EMAIL_VERIFICATION: 'Please verify your email by entering otp',
    OTP_VERIFICATION: 'Check your mail to verify OTP',
    ALREADY_APPLIED: 'You have already applied for it !',
    REGISTER_EMAIL: 'Please enter your registered email !',
  },

  SUCCESS: {
    USER_LOGGEDIN: 'User logged in successfully!',
    OTP_MESSAGE: 'Check your mail to verify OTP',
    SET_NEW_PASSWORD: 'Your OTP is verified, Please set new password !',
    LOGIN_MSG: 'Your email has been verified, Please login !',
    EMAIL_VERIFIED: 'Your email has been verified, Please login !',
    OTP_RESEND: 'OTP Resended on your mail !',
    SET_PASSWORD: 'Your password has been changed, please login !',
    LOGOUT_SUCCESSFUL: 'Logout successful',
    APPLICATION_SUBMIT: 'Your application has been submitted successfully !',
    FILE_UPLOADED: 'File uploaded successfully !',
    DATA_FETCHED: 'Data fetched successfully',
    UPDATED_STARTUP: 'Startup has been updated successfully !',
    MEETING_SCHEDULED: 'Meeting scheduled successfully !',
    EVENT_SCHEDULED: 'Event scheduled successfully !',
    EVENT_MEETING_FETCHED:
      'All the events and meeting are fetched successfully ',
    STARTUP_DELETED: 'Startup has been deleted successfully !',
    STATUS_FETCHED: 'Status fetched successfully !',
    FINANCE_UPDATED_STARTUP: 'Amount added successfully in given startup !',
    NOTIFICATION_CLEARED: 'Notification cleared',
    NOTIFICATION: 'Notification fetched Successfully!',
  },

  ADMIN: {
    MASTER_ACCESS: 'Only master admin has access !',
    SELECTED_ACCESS: 'Only master admin and admin has access !',
    CREATED: 'Admin created successfully',
    DELETED: 'Admin deleted successfully',
    NOT_EXIST: 'No admin present with email which you have provided',
    ALL_FETCHED_SUCCESS: 'fetched all the admin successfully !',
    NO_ADMIN_FOUND: 'No admin found !',
    WITHOUT_BRANCH:
      'Please contact adminstration as user does not contain any branch !',
    STARTUP_NOT_UNDER_ADMIN: 'Startup does not exits under this admin !',
    EXITS_SEC_STAGE_DET:
      'Already exits second stage details with this startupId !',
    ADDED_SEC_STAGE_DET: 'Second Stage data is added successfully !',
    SARTUP_ID_NOT_EXITS: 'Startup is not exits with this startupId !',
    FINANCE_ADDED: 'Finance details added successfully !',
    FINANCED_DATA_FETCHED: 'Fianace details fetched successfully !',
    SEC_STAGE_DATA_FETCHED: 'Second Stage details fetched successfully !',
    NEG_NET_BALANCE: 'Net balance cannot be negative !',
  },
}

exports.BRANCHES = {
  // this naming convention I follwed to save lines of code
  'Parul University': 'PA',
  'Vadodara Startup Studio': 'VSS',
  'Ahmedabad Startup Studio': 'AHSS',
  'Rajkot Startup Studio': 'RSS',
  'Surat Startup Studio': 'SSS',
}

exports.STATUS = Object.freeze({
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
})

exports.ROLE = {
  ADMIN: 'admin',
  MASTER_ADMIN: 'master admin',
  STUDENT: 'student',
}

exports.ACTIVITY = {
  MEETING: 'meeting',
  EVENT: 'event',
}

exports.LOCATION = {
  PA: 'Parul University',
  VSS: 'Vadodara Startup Studio',
  AHSS: 'Ahmedabad Startup Studio',
  RSS: 'Rajkot Startup Studio',
  SSS: 'Surat Startup Studio',
}
exports.CLEAR_NOTIFICATION_TYPES = {
  ALL: 'all',
  EVENT_AND_MEETING: 'eventAndMeeting',
  STARTUP: 'startup',
}

exports.FINANCE_TYPE = {
  CREDIT: 'credit',
  DEBIT: 'debit',
}
