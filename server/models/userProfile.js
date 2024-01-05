const mongoose = require('mongoose');
const isValidUrl = require('valid-url');
const xss = require('xss');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 4,
        unique: true,
    },
    nationality: {
        type: String,
        required: [true, 'Please provide nationality'],
    },
    contacts: [
        {
            type: {
                type: String, // E.g., 'email', 'phone', 'social', etc.
                required: true,
            },
            value: String, // E.g., the actual contact information (email address, phone number, social media URL)
        },
    ],
    bio: {
        type: String,
        minlength: 5,
        maxlength: 500,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Prefer not to say'], // Valid gender options
        required: true,
    },
    profilePictureUrl: {
        type: String,
        validate: {
            validator: function (url) {
                return isValidUrl.isUri(url); // Validate URL format
            },
            message: 'Invalid URL format',
        },
        maxlength: 255,
        unique: false,
        sparse: true,
        set: function (url) {
            // Encode and sanitize the URL before storing for security purposes
            return xss(encodeURIComponent(url));
        },
    },
    pic: {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    city: {
        type: String,
        required: [true, 'Please provide your city'],
    },
    skills: {
        type: [String],
        validate: [
            {
                validator: function (skills) {
                    // Check if the array has at most 3 items
                    if (skills.length > 3) return false;
                    // Check if each skill has a maximum length of 50 characters
                    return skills.every(skill => skill.length <= 50);
                },
                message: 'You can provide a maximum of 3 skills with each skill having a maximum length of 50 characters.',
            },
        ],
    },

    interests: {
        type: [String],
        validate: [
            {
                validator: function (interests) {
                    if (interests.length > 3) return false;
                    // Check if each interest has a maximum length of 50 characters
                    return interests.every(interest => interest.length <= 50);
                },
                message: 'You can provide a maximum of 3 interests with each interest having a maximum length of 50 characters.',
            },
        ],
    },
    // uploadedFiles: [
    //     {
    //         fileUrl: {
    //             type: String,
    //             validate: {
    //                 validator: isValidUrl.isUri, // Validate URL format
    //                 message: 'Invalid URL format',
    //             },
    //         },
    //         description: String, // A brief description of the uploaded file
    //         // You can add more fields to describe the file, such as type (certification, portfolio, example).
    //     },
    // ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user'],
    },
}, { timestamps: true });

profileSchema.pre('save', function (next) {
    if (!this.profilePictureUrl) {
        // Generate default URL based on name initials
        const initials = this.name
            .split(' ')
            .map((namePart) => namePart[0])
            .join('')
            .toUpperCase();

        this.profilePictureUrl = `https://example.com/profile-pics/${initials}.jpg`;
    }

    next();
});
// unique URL generation yet allowing duplicate initials
// profileSchema.pre('save', async function (next) {
//     if (!this.profilePictureUrl) {
//       const initials = this.name
//         .split(' ')
//         .map((namePart) => namePart[0])
//         .join('')
//         .toUpperCase();
  
//       const baseProfilePictureUrl = `https://example.com/profile-pics/${initials}`;
  
//       const generateUniqueSuffix = async () => {
//         let uniqueSuffix;
//         let isUnique = false;
  
//         while (!isUnique) {
//           uniqueSuffix = uniqueRandomString({
//             length: 6,
//             charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
//           })();
  
//           const existingProfile = await this.constructor.findOne({
//             profilePictureUrl: {
//               $regex: new RegExp(`^${baseProfilePictureUrl}-${uniqueSuffix}`, 'i'),
//             },
//           });
  
//           isUnique = !existingProfile;
//         }
  
//         return uniqueSuffix;
//       };
  
//       const uniqueSuffix = await generateUniqueSuffix();
  
//       this.profilePictureUrl = `${baseProfilePictureUrl}-${uniqueSuffix}.jpg`;
//     }
  
//     next();
//   });
  
  
//   module.exports = mongoose.model('Profile', profileSchema);
module.exports = mongoose.model('Profile', profileSchema);
