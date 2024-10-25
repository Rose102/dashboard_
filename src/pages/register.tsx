import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "../pages/register.css";

const Register = () => {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [age, setAge] = createSignal("");
  const [bloodType, setBloodType] = createSignal("");
  const [gender, setGender] = createSignal("");
  const [question, setQuestion] = createSignal(""); // Question state
  const [otp, setOtp] = createSignal(""); // OTP state
  const [nameError, setNameError] = createSignal(""); // Name error message state
  const [emailError, setEmailError] = createSignal(""); // Email error message state
  const [passwordError, setPasswordError] = createSignal(""); // Password error message state
  const [showSuccessPopup, setShowSuccessPopup] = createSignal(false); // OTP success popup
  const [showIncompletePopup, setShowIncompletePopup] = createSignal(false);
  const [provinsi, setProvinsi] = createSignal(""); // New state for province
  const [kabupaten, setKabupaten] = createSignal(""); // New state for regency
  const [kecamatan, setKecamatan] = createSignal(""); // New state for subdistrict
  const [showOtpPopup, setShowOtpPopup] = createSignal(false); // OTP popup state
  const [otpError, setOtpError] = createSignal(""); // OTP error message state
  const navigate = useNavigate();

  const kabupatenOptions = {
    Aceh: ["Banda Aceh", "Aceh Besar"],
    Bali: ["Denpasar", "Badung"],
    Banten: ["Serang", "Tangerang"],
    Bengkulu: ["Bengkulu Selatan", "Bengkulu Utara"],
    DI_Yogyakarta: ["Bantul", "Sleman"],
    DKI_Jakarta: ["Jakarta Selatan", "Jakarta Utara"],
    Gorontalo: ["Gorontalo Kota", "Boalemo"],
    Jambi: ["Jambi Kota", "Batanghari"],
    Jawa_Barat: ["Bandung", "Bekasi"],
    Jawa_Tengah: ["Semarang", "Solo"],
    Jawa_Timur: ["Surabaya", "Malang"],
    Kalimantan_Barat: ["Pontianak", "Sanggau"],
    Kalimantan_Selatan: ["Banjarmasin", "Banjar"],
    Kalimantan_Tengah: ["Palangka Raya", "Kotawaringin"],
    Kalimantan_Timur: ["Balikpapan", "Samarinda"],
    Kalimantan_Utara: ["Tarakan", "Nunukan"],
    Kepulauan_Bangka_Belitung: ["Pangkal Pinang", "Belitung"],
    Kepulauan_Riau: ["Batam", "Tanjung Pinang"],
    Lampung: ["Bandar Lampung", "Metro"],
    Maluku: ["Ambon", "Maluku Tengah"],
    Maluku_Utara: ["Ternate", "Tidore"],
    Nusa_Tenggara_Barat: ["Mataram", "Sumbawa"],
    Nusa_Tenggara_Timur: ["Kupang", "Flores"],
    Papua: ["Jayapura", "Merauke"],
    Papua_Barat: ["Sorong", "Manokwari"],
    Riau: ["Pekanbaru", "Dumai"],
    Sulawesi_Barat: ["Mamuju", "Majene"],
    Sulawesi_Selatan: ["Makassar", "Gowa"],
    Sulawesi_Tengah: ["Palu", "Donggala"],
    Sulawesi_Tenggara: ["Kendari", "Buton"],
    Sulawesi_Utara: ["Manado", "Bitung"],
    Sumatera_Barat: ["Padang", "Bukittinggi"],
    Sumatera_Selatan: ["Palembang", "Lubuklinggau"],
    Sumatera_Utara: ["Medan", "Binjai"],
  };

  const kecamatanOptions = {
    "Banda Aceh": ["Kecamatan Baiturrahman", "Kecamatan Kuta Alam"],
    "Aceh Besar": ["Kecamatan Ingin Jaya", "Kecamatan Darul Imarah"],
    Denpasar: ["Kecamatan Denpasar Selatan", "Kecamatan Denpasar Timur"],
    Badung: ["Kecamatan Kuta", "Kecamatan Mengwi"],
    Serang: ["Kecamatan Serang", "Kecamatan Kasemen"],
    Tangerang: ["Kecamatan Tangerang", "Kecamatan Ciledug"],
    "Bengkulu Selatan": ["Kecamatan Kaur", "Kecamatan Pino"],
    "Bengkulu Utara": ["Kecamatan Arga Makmur", "Kecamatan Kerkap"],
    Bantul: ["Kecamatan Bantul", "Kecamatan Banguntapan"],
    Sleman: ["Kecamatan Sleman", "Kecamatan Ngemplak"],
    "Jakarta Selatan": ["Kecamatan Kebayoran Baru", "Kecamatan Pasar Minggu"],
    "Jakarta Utara": ["Kecamatan Tanjung Priok", "Kecamatan Pademangan"],
    "Gorontalo Kota": ["Kecamatan Dungingi", "Kecamatan Hulonthalangi"],
    Boalemo: ["Kecamatan Boalemo", "Kecamatan Tilamuta"],
    "Jambi Kota": ["Kecamatan Jambi Selatan", "Kecamatan Jambi Timur"],
    Batanghari: ["Kecamatan Muara Bulian", "Kecamatan Bajubang"],
    Bandung: ["Kecamatan Bandung Kidul", "Kecamatan Bandung Wetan"],
    Bekasi: ["Kecamatan Bekasi Timur", "Kecamatan Bekasi Barat"],
    Semarang: ["Kecamatan Semarang Timur", "Kecamatan Semarang Barat"],
    Solo: ["Kecamatan Laweyan", "Kecamatan Jebres"],
    Surabaya: ["Kecamatan Wonokromo", "Kecamatan Tandes"],
    Malang: ["Kecamatan Klojen", "Kecamatan Blimbing"],
    Pontianak: ["Kecamatan Pontianak Kota", "Kecamatan Pontianak Selatan"],
    Sanggau: ["Kecamatan Sanggau", "Kecamatan Tayan Hilir"],
    Banjarmasin: ["Kecamatan Banjarmasin Tengah", "Kecamatan Banjarmasin Selatan"],
    Banjar: ["Kecamatan Banjar", "Kecamatan Martapura"],
    "Palangka Raya": ["Kecamatan Palangka Raya", "Kecamatan Bukit Batu"],
    "Kotawaringin": ["Kecamatan Kotawaringin Barat", "Kecamatan Kotawaringin Timur"],
    Balikpapan: ["Kecamatan Balikpapan Selatan", "Kecamatan Balikpapan Utara"],
    Samarinda: ["Kecamatan Samarinda Ilir", "Kecamatan Samarinda Ulu"],
    Tarakan: ["Kecamatan Tarakan Tengah", "Kecamatan Tarakan Barat"],
    Nunukan: ["Kecamatan Nunukan", "Kecamatan Sebatik"],
    "Pangkal Pinang": ["Kecamatan Pangkal Pinang", "Kecamatan Gerunggang"],
    Belitung: ["Kecamatan Tanjung Pandan", "Kecamatan Membalong"],
    Batam: ["Kecamatan Batam Kota", "Kecamatan Batu Ampar"],
    TanjungPinang: ["Kecamatan Tanjung Pinang Timur", "Kecamatan Tanjung Pinang Barat"],
    "Bandar Lampung": ["Kecamatan Bandar Lampung", "Kecamatan Teluk Betung"],
    Metro: ["Kecamatan Metro Pusat", "Kecamatan Metro Timur"],
    Ambon: ["Kecamatan Ambon", "Kecamatan Sirimau"],
    "Maluku Tengah": ["Kecamatan Masohi", "Kecamatan Tehoru"],
    Ternate: ["Kecamatan Ternate Tengah", "Kecamatan Ternate Selatan"],
    Tidore: ["Kecamatan Tidore", "Kecamatan Tidore Utara"],
    Mataram: ["Kecamatan Mataram", "Kecamatan Cakranegara"],
    Sumbawa: ["Kecamatan Sumbawa", "Kecamatan Ropang"],
    Kupang: ["Kecamatan Kupang Tengah", "Kecamatan Kupang Barat"],
    Flores: ["Kecamatan Ende", "Kecamatan Ngada"],
    Jayapura: ["Kecamatan Jayapura Selatan", "Kecamatan Jayapura Utara"],
    Merauke: ["Kecamatan Merauke", "Kecamatan Kurik"],
    Sorong: ["Kecamatan Sorong", "Kecamatan Sorong Selatan"],
    Manokwari: ["Kecamatan Manokwari", "Kecamatan Manokwari Selatan"],
    Pekanbaru: ["Kecamatan Pekanbaru Kota", "Kecamatan Pekanbaru Selatan"],
    Dumai: ["Kecamatan Dumai Kota", "Kecamatan Dumai Barat"],
    Mamuju: ["Kecamatan Mamuju", "Kecamatan Kalumpang"],
    Majene: ["Kecamatan Majene", "Kecamatan Sendana"],
    Makassar: ["Kecamatan Makassar", "Kecamatan Tamalate"],
    Gowa: ["Kecamatan Gowa", "Kecamatan Somba Opu"],
    Palu: ["Kecamatan Palu Selatan", "Kecamatan Palu Utara"],
    Donggala: ["Kecamatan Donggala", "Kecamatan Banawa"],
    Kendari: ["Kecamatan Kendari", "Kecamatan Poasia"],
    Buton: ["Kecamatan Buton", "Kecamatan Pasarwajo"],
    Manado: ["Kecamatan Manado", "Kecamatan Tuminting"],
    Bitung: ["Kecamatan Bitung Barat", "Kecamatan Bitung Timur"],
    Padang: ["Kecamatan Padang Barat", "Kecamatan Padang Selatan"],
    Bukittinggi: ["Kecamatan Bukittinggi", "Kecamatan Guguak"],
    Palembang: ["Kecamatan Palembang Ilir", "Kecamatan Palembang Utara"],
    Lubuklinggau: ["Kecamatan Lubuklinggau Selatan", "Kecamatan Lubuklinggau Utara"],
    Medan: ["Kecamatan Medan Petisah", "Kecamatan Medan Selayang"],
    Binjai: ["Kecamatan Binjai Kota", "Kecamatan Binjai Timur"]
  };
  
  
  const validateName = (name) => {
    return name.length >= 4; // Name must be at least 4 characters long
  };

  const validateEmail = (email) => {
    return email.endsWith("@gmail.com"); // Email must end with @gmail.com
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Removed underscore from special char check
    return hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name() || !email() || !password() || !age() || !bloodType() || !gender() || !question || !provinsi() || !kabupaten() || !kecamatan ()) {
        setShowIncompletePopup(true);
        setTimeout(() => setShowIncompletePopup(false), 3000);
        return;
    }

    if (!validateName(name())) {
        setNameError("Nama harus memiliki minimal 4 karakter.");
        return;
    } else {
        setNameError(""); // Clear name error if valid
    }

    if (!validateEmail(email())) {
        setEmailError("Email harus diakhiri dengan '@gmail.com'.");
        return;
    } else {
        setEmailError(""); // Clear email error if valid
    }

    if (!validatePassword(password())) {
        setPasswordError("Password harus mengandung minimal 1 huruf kapital, 1 angka, dan 1 karakter khusus.");
        return;
    } else {
        setPasswordError(""); // Clear password error if valid
    }

    const newUser = {
        username: name(),
        email: email(),
        password: password(),
        age: age(),
        blood_type: bloodType(),
        gender: gender(),
        question: question(), // Add question to newUser object
        provinsi: provinsi(), // Send province
        kabupaten: kabupaten(), // Send regency
        kecamatan: kecamatan(), // Send subdistrict
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setShowOtpPopup(true); // Show OTP verification popup
        } else {
            const error = await response.json();
            console.error(error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/verify_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email(), otp: otp() }),
      });

      if (response.ok) {
        console.log("OTP verified");
        setShowOtpPopup(false);
        setShowSuccessPopup(true); // Show success popup after OTP verification
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/"); // Redirect to login page
        }, 3000);
      } else {
        setOtpError("OTP tidak valid. Silakan coba lagi."); // Show error message if OTP is invalid
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="container">
      <div class="form-container">
        <div class="logo">
          <img src="src/public/Dash-removebg-preview.png" alt="Logo" />
        </div>
        <div class="header-container">
          <h2 class="form-header">Daftar</h2>
        </div>
        <div class="flex-group">
          <label class="form-label">Masukan Nama Anda</label>
          <input
            type="text"
            class="form-input"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
          {nameError() && <p class="error-message">{nameError()}</p>}
        </div>
        <div class="flex-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-input"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          {emailError() && <p class="error-message">{emailError()}</p>}
        </div>
        <div class="flex-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-input"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          {passwordError() && <p class="error-message">{passwordError()}</p>}
        </div>
        <div class="flex-group">
          <label class="form-label">Pertanyaan Anda</label>
          <input
            type="text"
            class="form-input"
            placeholder="Masukkan pertanyaan Anda"
            value={question()}
            onInput={(e) => setQuestion(e.currentTarget.value)}
          />
        </div>

        {/* Provinsi input */}
        <div class="flex-group">
            <label class="form-label">Provinsi</label>
            <select
              class="form-select"
              value={provinsi()}
              onChange={(e) => {
                setProvinsi(e.currentTarget.value);
                setKabupaten("");
                setKecamatan("");
              }}
            >
              <option value="">Pilih Provinsi</option>
              {Object.keys(kabupatenOptions).map((prov) => (
                <option value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          <div class="flex-group">
            <label class="form-label">Kabupaten</label>
            <select
              class="form-select"
              value={kabupaten()}
              onChange={(e) => {
                setKabupaten(e.currentTarget.value);
                setKecamatan("");
              }}
              disabled={!provinsi()}
            >
              <option value="">Pilih Kabupaten</option>
              {provinsi() && kabupatenOptions[provinsi()].map((kab) => (
                <option value={kab}>{kab}</option>
              ))}
            </select>
          </div>

        {/* Kecamatan input */}
        <div class="flex-group">
            <label class="form-label">Kecamatan</label>
            <select
              class="form-select"
              value={kecamatan()}
              onChange={(e) => setKecamatan(e.currentTarget.value)}
              disabled={!kabupaten()}
            >
              <option value="">Pilih Kecamatan</option>
              {kabupaten() && kecamatanOptions[kabupaten()].map((kec) => (
                <option value={kec}>{kec}</option>
              ))}
            </select>
          </div>

        <div class="flex-group umur">
          <div class="half-width">
            <label class="form-label">Umur</label>
            <input
              type="text"
              class="form-input"
              value={age()}
              onInput={(e) => setAge(e.currentTarget.value)}
            />
          </div>
          <div class="half-width">
            <label class="form-label">Gol Darah</label>
            <select
              class="form-select"
              value={bloodType()}
              onChange={(e) => setBloodType(e.currentTarget.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <select
            class="form-select"
            value={gender()}
            onChange={(e) => setGender(e.currentTarget.value)}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div class="form-group">
          <button class="submit-button" onClick={handleSubmit}>
            Daftar
          </button>
        </div>
        <div class="text-center">
          <a href="/" class="login-link">Sudah Punya Akun? Login</a>
        </div>
      </div>
      <div class="image-container">
        <img src="src/public/register pic.png" alt="Illustration" />
      </div>

      {showSuccessPopup() && (
        <div class="popup success">
          <p>Registrasi Berhasil!</p>
        </div>
      )}

      {showIncompletePopup() && (
        <div class="popup error">
          <p>Harap mengisi semua data terlebih dahulu!</p>
        </div>
      )}

      {showOtpPopup() && (
        <div class="popup otp">
          <h3>Masukkan OTP</h3>
          <input
            type="text"
            class="form-input"
            placeholder="Masukkan kode OTP"
            value={otp()}
            onInput={(e) => setOtp(e.currentTarget.value)}
          />
          {otpError() && <p class="error-message">{otpError()}</p>}
          <button class="confirm-button" onClick={handleOtpSubmit}>
            Konfirmasi
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
