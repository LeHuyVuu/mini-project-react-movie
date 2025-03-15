import { signify } from "react-signify";

// Create a state-like object with updated values
export const sTicketInfo = signify({
  data: {
    id: "ghelllo", // Changed to null
    status: null, // Changed to null
    movie: {
      name: null, // Changed to null
      imageLandscape: null, // Changed to null
      imagePortrait: null, // Changed to null
      caption: null, // Changed to null
      version: null, // Changed to null
      movieFormat: null, // Changed to null
      age: null, // Changed to null
      duration: 0 // Changed to 0
    },
    cinema: {
      name: null, // Changed to null
      id: null, // Changed to null
      code: null // Changed to null
    },
    session: {
      id: null, // Changed to null
      screenName: null, // Changed to null
      sessionDate: null // Changed to null
    },
    concessions: [
      {
        description: null, // Changed to null
        itemId: 0, // Changed to 0
        quantity: 0, // Changed to 0
        price: 0 // Changed to 0
      },
      {
        description: null, // Changed to null
        itemId: 0, // Changed to 0
        quantity: 0, // Changed to 0
        price: 0 // Changed to 0
      }
    ],
    tickets: [
      {
        description: null, // Changed to null
        price: 0, // Changed to 0
        ticketTypeCode: null, // Changed to null
        seats: [] // Changed to empty array
      },
      {
        description: null, // Changed to null
        price: 0, // Changed to 0
        ticketTypeCode: null, // Changed to null
        seats: [] // Changed to empty array
      }
    ],
    barcodes: [], // Changed to empty array
    total: 0, // Changed to 0
    discountAmount: 0, // Changed to 0
    loyaltyPoint: 0, // Changed to 0
    loyaltyDiscount: 0, // Changed to 0
    totalPoints: 0 // Changed to 0
  }
});

console.log(sTicketInfo); // This will log the object with updated values
