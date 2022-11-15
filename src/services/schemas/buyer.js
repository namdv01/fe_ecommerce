const buyer = {
  login: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: 'Email không hợp lệ',
      },
      password: {
        type: 'string',
        pattern:
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        errorMessage:
          'Mật khẩu tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 ký tự đặc biệt',
      },
    },
    required: ['email', 'password'],
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Thông tin chỉ gồm email và password',
      required: {
        email: 'Nhập thiếu email',
        password: 'Nhập thiếu password',
      },
    },
  },
  forgetPassword: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: 'Email không hợp lệ',
      },
    },
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Thông tin chỉ gồm email',
      required: {
        email: 'Nhập thiếu email',
      },
    },
  },
  register: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        errorMessage: 'Email không hợp lệ',
      },
      password: {
        type: 'string',
        pattern:
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        errorMessage:
          'Mật khẩu tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 ký tự đặc biệt',
      },
      fullName: {
        type: 'string',
        minLength: 1,
        errorMessage: 'Họ tên không hợp lệ',
      },
      gender: {
        enum: ['male', 'female', 'other'],
        errorMessage: 'Giới tính không hợp lệ',
      },
      phoneNumber: {
        type: 'string',
        errorMessage: 'Số điện thoại không hợp lệ',
        pattern: '^[0-9]+$',
        minLength: 9,
      },
      address: {
        type: 'string',
        errorMessage: 'Địa chỉ không hợp lệ',
        minLength: 1,
      },
      position: {
        enum: ['seller', 'buyer', 'admin'],
        errorMessage: 'Vai trò không hợp lệ',
      },
    },
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Có thuộc tính không hợp lệ',
      required: {
        email: 'Thiếu email',
        password: 'Thiếu password',
        fullName: 'Thiếu họ và tên',
        address: 'Thiếu địa chỉ',
        gender: 'Thiếu giới tính',
        phoneNumber: 'Thiếu số điện thoại',
        position: 'Thiếu vị trí',
      },
    },
  },
};

export default buyer;
