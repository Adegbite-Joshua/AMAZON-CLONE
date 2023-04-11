function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: "pk_test_020bedb6004bb3a95bb5589b33405add7e4e79a2",
    email: user.email,
    amount: amountToPay * 100,
    ref: "PROADE" + Math.floor(Math.random() * 10000000 + 1),
    onClose: function () {
      let message = "You just cancel this transaction";
      Swal.fire({
        icon: "error",
        title: "Dear " + `${user.firstName} ${user.lastName}`,
        text: message,
        footer:
          "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
      });
    },
    callback: function (response) {
      let message ="Payment completed! Your Reference Number is: " + response.reference;
      Swal.fire({
        icon: "success",
        title: "Thank You " + `${user.firstName} ${user.lastName}`,
        text: message,
        footer: 'Your Order is on the way. Your order is expected to be deliverd to you on or before the agreed date. Click <a href="#">here</a> '+"to track your order"
      });
    },
  });

  handler.openIframe();
}











// var paymentForm = document.getElementById('paymentForm');
// paymentForm.addEventListener('submit', payWithPaystack, false);
// function payWithPaystack() {
//   var handler = PaystackPop.setup({
//     key: 'YOUR_PUBLIC_KEY', // Replace with your public key
//     email: document.getElementById('email-address').value,
//     amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
//     currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
//     ref: 'YOUR_REFERENCE', // Replace with a reference you generated
//     callback: function(response) {
//       //this happens after the payment is completed successfully
//       var reference = response.reference;
//       alert('Payment complete! Reference: ' + reference);
//       // Make an AJAX call to your server with the reference to verify the transaction
//     },
//     onClose: function() {
//       alert('Transaction was not completed, window closed.');
//     },
//   });
//   handler.openIframe();
// }