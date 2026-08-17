var porkSpecials = [
  {
    name: 'Pork Sticks / Skewers (Muchomo)',
    price: 'Ugx 6000',
    desc: 'Seasoned chunks of meat roasted over charcoal, easily eaten on the go.'
  },
  {
    name: 'One kg Lusaniya (Deep-Fried / Pan-Fried Special)',
    price: 'Ugx 20,000',
    desc: 'Heavy, succulent cuts fried traditionally in a wide, shallow metal pan (lusaniya), often cooked directly in their own rich fats alongside onions and tomatoes.'
  },
  {
    name: 'A half kg Roasted Ribs & Chunks',
    price: 'Ugx 10,000',
    desc: 'Wet or dry-rubbed ribs and shoulder cuts charred over open flames.'
  },
  {
    name: 'Specialty Parts (Ears, Feet)',
    price: 'Ugx 10,000 per plate',
    desc: 'Ears and feet (amatu or ekigyere) and other fatty bits prized for their crunchy, gelatinous texture.'
  }
];

document.addEventListener('DOMContentLoaded', function() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var menuContainer = document.getElementById('signature-dishes');
  if (menuContainer) {
    menuContainer.innerHTML = porkSpecials.map(function(dish) {
      return '<div class="dish-card">' +
        '<h4>' + escapeHtml(dish.name) + ' <span>' + escapeHtml(dish.price) + '</span></h4>' +
        '<p>' + escapeHtml(dish.desc) + '</p>' +
        '</div>';
    }).join('');
  }

  var form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var fullname = (form.elements['fullname'] || {}).value || '';
    var whatsapp = (form.elements['whatsapp'] || {}).value || '';
    var guests = (form.elements['guests'] || {}).value || '';

    fullname = fullname.trim();
    whatsapp = whatsapp.trim();
    guests = guests.toString().trim();

    var resp = document.getElementById('form-response');
    if (!fullname || !whatsapp || !guests) {
      if (resp) resp.textContent = 'Please fill out all fields.';
      return;
    }

    var businessPhone = '256701845806';
    var message = 'Hello, I would like to reserve a table.\nName: ' + fullname + '\nGuests: ' + guests + '\nContact: ' + whatsapp;
    var url = 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(businessPhone) + '&text=' + encodeURIComponent(message);

    window.open(url, '_blank');
  });
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
