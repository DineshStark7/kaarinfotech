document.getElementById("applyButton").addEventListener("click", function () {
  const email = "hr@kaarinfotech.com";
  const subject = "Job Application - [Mention your Role]"; // Optional, can be changed
  const body =
    "Dear HR,\n\nI am interested in applying for the position. Here's my latest resume \n\n [Attach you latest Resume]\n\n\n [Remove the square brackets and you can change template if you have one.]"; // Optional

  // Construct the mailto link
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the default mail client
  window.location.href = mailtoLink;
});
