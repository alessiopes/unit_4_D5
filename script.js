// Esegue la funzione quando l'intera pagina HTML é pronta
document.addEventListener('DOMContentLoaded', async function() {
    // Funzione per ottenere i dati dalla chiamata API e aggiornare la tabella
    async function updateTable() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            const data = await response.json();
            console.log(data);

            let filterValue = document.getElementById('filter').value;
            let searchValue = document.getElementById('search').value.toLowerCase();

            // Filtra i dati in base tipo filtro e keyword in barra ricerca
            let filteredData = [];
            data.forEach(item => {
                let value = item[filterValue].toLowerCase();
                let includesSearchValue = value.includes(searchValue);
                if (includesSearchValue) {
                    filteredData.push(item);
                }
            });            
            

            // Genera le righe della tabella
            let tableBody = document.getElementById('table-body');
            tableBody.innerHTML = ''; // Svuota il corpo della tabella

            // Itera tutto l'array in data
            filteredData.forEach(item => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.username}</td>
                    <td>${item.email}</td>
                    <td>${item.website}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            alert(error.message);
        }
    }

    // Seleziona l'elemento DOM del filtro e della barra di ricerca
    let filterSelect = document.getElementById('filter');
    let searchInput = document.getElementById('search');

    // Ogni volta che viene cambiato il filtro, esegue funzione per aggiornare tabella
    filterSelect.addEventListener('change', updateTable);

    // Ogni volta che viene premuto un pulsante nella barra di ricerca, viene aggiornata la tabella
    searchInput.addEventListener('keyup', updateTable);

    // Aggiorna la tabella all'avvio della pagina
    updateTable();
});