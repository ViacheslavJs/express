// 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', async () => {
    
  try {
    const response = await fetch('/rest/players/data');
    const data = await response.json();
    const tableBody = document.getElementById('table-body');

    data.forEach((player, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${player.id}</td>
        <td>${player.name}</td>
        <td>${player.price}</td>
        <td>${player.text}</td>
        <td>${player.species}</td>
        <td>${player.imagePath}</td>
        <td class="cell-delete">
          <button class="button-delete font-awesome-icon fas fa-trash-alt"></button>
        </td>
      `;
      tableBody.appendChild(row);
      // второй параметр в forEach - index - если нужен порядковый номер по массиву, тогда
      // <td>${player.Id}</td> заменить на <td>${index + 1}</td>
    });
        
    const deleteButtons = document.querySelectorAll('.button-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        deleteRow(button);
      });
    });                                           
        
  } catch (error) {
    console.error('Error fetching data:', error);
  }
      
});
// 'DOMContentLoaded'

    
// deleteRow
async function deleteRow(button) {
  const row = button.parentElement.parentElement;
  const playerName = row.querySelector('td:nth-child(2)').textContent; 
  console.log(playerName);

  try {
    const response = await fetch(`/rest/players/${encodeURIComponent(playerName)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      row.remove();
      location.reload();
    } else {
      console.error('Failed to delete the player.');
    }
        
  } catch (error) {
    console.error('Error deleting player:', error);
  }
      
}
// deleteRow

    
// 'addPlayerForm'
document.getElementById('addPlayerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPlayer = {
    id: parseInt(document.getElementById('id').value),
    name: document.getElementById('name').value,
    price: parseInt(document.getElementById('price').value),
    text: document.getElementById('text').value,
    species: document.getElementById('species').value,
    imagePath: document.getElementById('imagePath').value,
  };

  try {
    const response = await fetch('/rest/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });

    if (response.status === 201) {
      // Успешное добавление, перезагрузить страницу или обновить данные
      location.reload();
      clearFormFields(); // Очистка полей формы
    } else {
      console.error("Failed to add player.");
    }
        
    // Очистка полей после добавления
    function clearFormFields() {
      document.getElementById('id').value = '';
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('text').value = '';
      document.getElementById('species').value = '';
      document.getElementById('imagePath').value = '';
    }
            
  } catch (error) {
    console.error("Error adding player:", error);
  }
        
});
// 'addPlayerForm'
        
