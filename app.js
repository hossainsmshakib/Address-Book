$(document).ready(function () {
  let contacts = [];

  function renderContacts() {
    const contactList = $("#contactList");
    contactList.empty();

    contacts.forEach(function (contact, index) {
      const listItem = $("<li>").addClass("contactItem");
      listItem.html(`<strong>${contact.name} ${contact.surname}</strong><br>
                            Phone: ${contact.phone}<br>
                            Address: ${contact.address}
                            <button class="deleteBtn" data-index="${index}">Delete</button>`);
      contactList.append(listItem);
    });

    $(".deleteBtn").click(function () {
      const index = $(this).data("index");
      contacts.splice(index, 1);
      renderContacts();
    });
  }

  function showContactForm() {
    $("#contactForm")[0].reset();
    $("#contactForm").slideDown();
    $("#addContactBtn").prop("disabled", true);
  }

  $("#addContactBtn").click(showContactForm);

  $("#cancelBtn").click(function () {
    $("#contactForm").slideUp();
    $("#addContactBtn").prop("disabled", false);
  });

  $("#contactForm").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const surname = $("#surname").val();
    const phone = $("#phone").val();
    const address = $("#address").val();

    if (name && surname && phone && address) {
      const newContact = { name, surname, phone, address };
      contacts.push(newContact);
      renderContacts();

      $("#contactForm").slideUp();
      $("#addContactBtn").prop("disabled", false);
    } else {
      alert("Please fill in all fields.");
    }
  });

  $("#searchInput").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();
    const searchResults = $("#searchResults");
    searchResults.empty();

    if (searchTerm.length > 0) {
      let matchFound = false;

      contacts.forEach(function (contact) {
        const fullName = `${contact.name.toLowerCase()} ${contact.surname.toLowerCase()}`;
        const firstNameMatch = contact.name.toLowerCase().includes(searchTerm);
        const surnameMatch = contact.surname.toLowerCase().includes(searchTerm);
        const partialMatch = searchTerm
          .split("")
          .some((letter) => fullName.includes(letter));

        if (firstNameMatch || surnameMatch || partialMatch) {
          matchFound = true;

          const resultItem = $("<div>").addClass("searchResultItem");
          const highlightedName = highlightMatchingText(
            contact.name,
            searchTerm
          );
          const highlightedSurname = highlightMatchingText(
            contact.surname,
            searchTerm
          );
          resultItem.html(`<strong>${highlightedName} ${highlightedSurname}</strong><br>
                                  Phone: ${contact.phone}<br>
                                  Address: ${contact.address}`);
          searchResults.append(resultItem);
        }
      });

      if (!matchFound) {
        searchResults.append("No match found");
      }
    }
  });

  // Function to highlight matching text
  function highlightMatchingText(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  renderContacts();
});
