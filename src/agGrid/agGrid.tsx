
import { createSignal, onCleanup, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import LineChartShare from '../amchart/chart';
import Chart2 from '../amchart/piechartgolongandarah';
import Navbar from './navbar';
import './agGrid.css';

const Grid = () => {
    let gridApi;
    const [isEditing, setIsEditing] = createSignal(false);
    const [isAdding, setIsAdding] = createSignal(false);
    const [currentUser, setCurrentUser] = createSignal(null);
    const [username, setName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [age, setAge] = createSignal('');
    const [blood_type, setBloodType] = createSignal('');
    const [gender, setGender] = createSignal('');
    const [provinsi, setProvinsi] = createSignal(""); // New state for province
    const [kabupaten, setKabupaten] = createSignal(""); // New state for regency
    const [kecamatan, setKecamatan] = createSignal(""); 

    const provinsiOptions = [
        { value: 'Jakarta', label: 'Jakarta' },
        { value: 'Jawa Barat', label: 'Jawa Barat' },
        { value: 'Jawa Timur', label: 'Jawa Timur' },
        { value: 'Bali', label: 'Bali' },
    ];

    // Daftar kabupaten untuk masing-masing provinsi
    const kabupatenOptions = {
        Jakarta: [
            { value: 'Jakarta Pusat', label: 'Jakarta Pusat' },
            { value: 'Jakarta Utara', label: 'Jakarta Utara' },
            { value: 'Jakarta Barat', label: 'Jakarta Barat' },
            { value: 'Jakarta Selatan', label: 'Jakarta Selatan' },
            { value: 'Jakarta Timur', label: 'Jakarta Timur' },
        ],
        'Jawa Barat': [
            { value: 'Bandung', label: 'Bandung' },
            { value: 'Bogor', label: 'Bogor' },
            { value: 'Depok', label: 'Depok' },
            { value: 'Bandung Barat', label: 'Bandung Barat' },
        ],
        'Jawa Timur': [
            { value: 'Surabaya', label: 'Surabaya' },
            { value: 'Malang', label: 'Malang' },
            { value: 'Jember', label: 'Jember' },
            { value: 'Bangkalan', label: 'Bangkalan' },
        ],
        Bali: [
            { value: 'Denpasar', label: 'Denpasar' },
            { value: 'Badung', label: 'Badung' },
            { value: 'Gianyar', label: 'Gianyar' },
            { value: 'Karangasem', label: 'Karangasem' },
        ],
    };

    // Daftar kecamatan untuk masing-masing kabupaten
    const kecamatanOptions = {
        'Jakarta Pusat': [
            { value: 'Cempaka Putih', label: 'Cempaka Putih' },
            { value: 'Gambir', label: 'Gambir' },
        ],
        'Jakarta Utara': [
            { value: 'Kebon Bawang', label: 'Kebon Bawang' },
            { value: 'Pluit', label: 'Pluit' },
        ],
        Bandung: [
            { value: 'Cibiru', label: 'Cibiru' },
            { value: 'Cibeunying', label: 'Cibeunying' },
        ],
        Malang: [
            { value: 'Klojen', label: 'Klojen' },
            { value: 'Lowokwaru', label: 'Lowokwaru' },
        ],
    };

    // Handle perubahan provinsi
    const handleProvinsiChange = (e: Event) => {
        const selectedProvinsi = (e.target as HTMLSelectElement).value;
        setProvinsi(selectedProvinsi);
        setKabupaten(''); // Reset kabupaten dan kecamatan saat provinsi berubah
        setKecamatan('');
    };

    // Handle perubahan kabupaten
    const handleKabupatenChange = (e: Event) => {
        setKabupaten((e.target as HTMLSelectElement).value);
        setKecamatan(''); // Reset kecamatan saat kabupaten berubah
    };

    
    // State for gender data
    const [genderData, setGenderData] = createSignal({
        male: 0,
        female: 0,
        total: 0
    });

    // Fetch users from API
    const fetchUsersFromApi = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/users');
            if (!response.ok) throw new Error('Failed to fetch user data');
            const data = await response.json();
            console.log('Fetched user data:', data);
            setRowData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch gender data from backend
    const fetchGenderData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/gender_data');
            if (!response.ok) throw new Error('Failed to fetch gender data');
            const data = await response.json();
            console.log('Fetched gender data:', data);
            setGenderData({
                male: data.male || 0,
                female: data.female || 0,
                total: data.total || 0
            });
        } catch (error) {
            console.error('Error fetching gender data:', error);
        }
    };

    // Handle editing user data
    const handleEdit = (user) => {
        console.log('Editing user:', user);
        setIsEditing(true);
        setCurrentUser(user);
        setName(user.username || '');
        setAge(user.age || '');
        setBloodType(user.blood_type || '');
        setGender(user.gender || '');
        setProvinsi(user.provinsi || '');
        setKabupaten(user.provinsi || '');
        setKecamatan(user.provinsi || '');
    };

    // Handle deleting user data
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/users/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete user');
            // Fetch updated user data after deletion
            fetchUsersFromApi();
            // Fetch updated gender data after deleting a user
            fetchGenderData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Handle saving user data
    const handleSave = async () => {
        try {
            const updatedUser = {
                username: username(),
                age: age(),
                blood_type: blood_type(),
                gender: gender(),

            };
            
            const response = await fetch(`http://127.0.0.1:8080/update_user/${currentUser().id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            
    
            if (response.ok) {
                try {
                    const result = await response.json();
                    console.log('User updated successfully:', result);
                    fetchUsersFromApi(); // Refresh user data
                    setIsEditing(false);
                    alert('User updated successfully');
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('User updated, but failed to parse response.');
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to update user:', errorText);
                alert('Failed to update user: ' + errorText);
            }
            
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user: ' + error.message);
        }
    };
    
    

    const handleAdd = async () => {
        try {
            // Prepare new user data
            const newUser = {
                username: username(),
                email: email(),
                password: password(),
                age: age(),
                blood_type: blood_type(),
                gender: gender(),
                provinsi: provinsi(),
                kabupaten: kabupaten(),
                kecamatan: kecamatan(),
            };
    
            // Log data being sent for debugging
            console.log('Sending request with data:', newUser);
    
            // Send POST request to add new user
            const response = await fetch('http://127.0.0.1:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            // Capture and log the response for debugging
            const textResponse = await response.text();
            console.log('Response:', textResponse);
    
            // Check if response is OK
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
    
            // Fetch updated user data after adding new user
            fetchUsersFromApi();
    
            // Fetch updated gender data after adding a new user
            fetchGenderData();
    
            // Exit adding mode
            setIsAdding(false);
        } catch (error) {
            // Log error to console
            console.error('Error adding user:', error.message);
    
            // Show alert with error message
            alert(`Error adding user: ${error.message}`);
        }
    };
    const handleAddClick = () => {
        setIsAdding(true);
    };
    
    
    // Define column definitions for ag-Grid
    const columnDefs = [
        { headerName: 'Name', field: 'username', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Password', field: 'password', sortable: true, filter: true },
        { headerName: 'Age', field: 'age', sortable: true, filter: true },
        { headerName: 'Blood Type', field: 'blood_type', sortable: true, filter: true },
        { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
        { headerName: 'Provinsi', field: 'provinsi', sortable: true, filter: true },
        { headerName: 'Kabupaten', field: 'kabupaten', sortable: true, filter: true },
        { headerName: 'Kecamatan', field: 'kecamatan', sortable: true, filter: true },
        {
            headerName: 'Actions',
            cellRenderer: (params) => {
                const { data } = params;
                return (
                    <div class="action-buttons">
                        <button class="edit-button" onClick={() => handleEdit(data)}>
                            Edit
                        </button>
                        <button class="delete-button" onClick={() => handleDelete(data.id)}>
                            Delete
                        </button>
                        <button class="add-button" onClick={() => setIsAdding(true)}>
                        Add
                    </button>
                    </div>
                );
            },
        },
    ];    

    const onGridReady = (params) => {
        gridApi = params.api;
        gridApi?.sizeColumnsToFit();
    };

    const [rowData, setRowData] = createSignal([]);

    // Fetch data on component mount
    onMount(() => {
        fetchUsersFromApi();
        fetchGenderData();
    });

    onCleanup(() => {
        // Cleanup code if needed
    });


    return (
        <div class="admin-page">
            <Navbar/>
            <div class="dashboard">
                <div class="stats-card">
                    <h3>Total Pengguna</h3>
                    <p>{genderData().total}</p>
                </div>
                <div class="stats-card">
                    <h3>Pengguna Laki-laki</h3>
                    <p>{genderData().male}</p>
                </div>
                <div class="stats-card">
                    <h3>Pengguna Perempuan</h3>
                    <p>{genderData().female}</p>
                </div>
            </div>
            
            <div class="activity-log">
                <h3>Aktivitas Terkini</h3>
                <ul>
                    {rowData().map((user) => {
                        const verifiedUsername = user.username?.trim() ? user.username : 'Unknown User';
                        const loginDate = user.loginDate
                            ? new Date(user.loginDate).getTime() > 0
                                ? new Date(user.loginDate).toLocaleString()
                                : 'Unknown Date'
                            : 'Unknown Date';
                        return (
                            <li>{`${verifiedUsername} logged in on ${loginDate}`}</li>
                        );
                    })}
                </ul>
            </div>



            <div class="user-management">
                <h3>User Management</h3>
                <div class="ag-theme-alpine" style={{ height: '250px', flex: 1 }}>
                    <AgGridSolid
                        columnDefs={columnDefs}
                        rowData={rowData()}
                        domLayout="autoHeight"
                        onGridReady={onGridReady}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 150,
                            resizable: true,
                        }}
                    />
                </div>
                {isEditing() && (
                    <div class="edit-form">
                        <h3>Edit User</h3>  
                        <label>
                            Name:
                            <input type="text" value={username()} onInput={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Age:
                            <input type="text" value={age()} onInput={(e) => setAge(e.target.value)} />
                        </label>
                        <label>
                            Blood Type:
                            <select value={blood_type()} onChange={(e) => setBloodType(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </label>
                        <label>
                            Gender:
                            <select value={gender()} onChange={(e) => setGender(e.target.value)}>
                                <option value="Laki-Laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </label>
                        <div class="button-container">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                )}
                {isAdding() && (
                    <div class="add-form">
                        <h3>Add User</h3>
                        <label>
                            Name:
                            <input type="text" value={username()} onInput={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Email:
                            <input type="text" value={email()} onInput={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password()} onInput={(e) => setPassword(e.target.value)} />
                        </label>
                        <label>
                            Age:
                            <input type="text" value={age()} onInput={(e) => setAge(e.target.value)} />
                        </label>
                        <label>
                            Blood Type:
                            <select value={blood_type()} onInput={(e) => setBloodType(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </label>
                        <label>
                            Gender:
                            <select value={gender()} onInput={(e) => setGender(e.target.value)}>
                                <option value="Laki-Laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </label>
                        
                        <label>
                        Provinsi:
                <select value={provinsi()} onChange={handleProvinsiChange}>
                    <option value="">Pilih Provinsi</option>
                    {provinsiOptions.map(option => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Kabupaten:
                <select value={kabupaten()} onChange={handleKabupatenChange} disabled={!provinsi()}>
                    <option value="">Pilih Kabupaten</option>
                    {provinsi() && kabupatenOptions[provinsi()]?.map(option => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Kecamatan:
                <select value={kecamatan()} onChange={(e) => setKecamatan((e.target as HTMLSelectElement).value)} disabled={!kabupaten()}>
                    <option value="">Pilih Kecamatan</option>
                    {kabupaten() && kecamatanOptions[kabupaten()]?.map(option => (
                        <option value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
                        <div class="button-container">
                            <button onClick={handleAdd}>Add</button>
                            <button onClick={() => setIsAdding(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>


            <div class="charts-container">
                <LineChartShare />
                <Chart2 />
            </div>

        </div>
    );
};

export default Grid;

