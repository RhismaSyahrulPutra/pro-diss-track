import axios from 'axios';
import { BASE_URL } from '../../config/config';

export default function ProfilePreference() {
  const accessToken = localStorage.getItem('accessToken');

  const html = `
   <div class="w-full">
  <h2 class="text-2xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
  <form id="profile-settings-form" class="space-y-6">
    <!-- Photo preview center dengan border biru 600 -->
    <div class="flex flex-col items-center mb-4">
     <img 
  id="profile_photo_preview" 
  src="https://randomuser.me/api/portraits/lego/1.jpg" 
  alt="Profile Photo" 
  class="w-48 h-48 object-cover rounded-full mb-4" 
  style="border: 4px solid #2563eb;" 
/>
      <!-- Upload foto di bawah foto, center -->
      <label for="profile_photo" class="block text-gray-700 font-medium mb-2 cursor-pointer">Upload Foto Profil</label>
      <input 
        type="file" 
        id="profile_photo" 
        name="profile_photo" 
        accept="image/*" 
        class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>

    <!-- Umur dan Pekerjaan satu baris -->
    <div class="flex gap-4">
      <div class="flex-1">
        <label for="age" class="block text-gray-700 font-medium mb-1">Umur</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex-1">
        <label for="job_title" class="block text-gray-700 font-medium mb-1">Pekerjaan</label>
        <input 
          type="text" 
          id="job_title" 
          name="job_title" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label for="about_me" class="block text-gray-700 font-medium mb-1">Tentang Saya</label>
      <textarea 
        id="about_me" 
        name="about_me" 
        rows="4" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
    </div>

    <button 
      type="submit" 
      class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Simpan Perubahan
    </button>
  </form>
</div>
  `;

  setTimeout(() => {
    if (!accessToken) {
      console.log('No access token found');
      return;
    }

    // Ambil data profil awal untuk isi form
    axios
      .get(`${BASE_URL}/profiles/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const profile = response.data.data.profile;

        const form = document.getElementById('profile-settings-form');
        form.querySelector('#age').value = profile.age ?? '';
        form.querySelector('#job_title').value = profile.job_title ?? '';
        form.querySelector('#about_me').value = profile.about_me ?? '';

        const photoPreview = form.querySelector('#profile_photo_preview');
        if (profile.profile_photo_url) {
          photoPreview.src = profile.profile_photo_url;
          photoPreview.style.display = 'block';
        } else {
          photoPreview.style.display = 'none';
        }
      })
      .catch((error) => {
        console.error(
          'Error fetching profile:',
          error.response?.data?.message || error.message,
        );
      });
  }, 100);

  // Preview foto saat user pilih file baru
  setTimeout(() => {
    const photoInput = document.getElementById('profile_photo');
    const photoPreview = document.getElementById('profile_photo_preview');

    if (!photoInput || !photoPreview) return;

    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0];
      if (file) {
        photoPreview.src = URL.createObjectURL(file);
        photoPreview.style.display = 'block';
      } else {
        photoPreview.style.display = 'none';
      }
    });
  }, 200);

  // Handle form submit untuk kirim data update
  setTimeout(() => {
    const form = document.getElementById('profile-settings-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!accessToken) {
        alert('Access token not found, please login again.');
        return;
      }

      const age = form.querySelector('#age').value;
      const job_title = form.querySelector('#job_title').value;
      const about_me = form.querySelector('#about_me').value;
      const profile_photo_file = form.querySelector('#profile_photo').files[0];

      try {
        const formData = new FormData();
        formData.append('age', age);
        formData.append('job_title', job_title);
        formData.append('about_me', about_me);
        if (profile_photo_file) {
          formData.append('profile_photo', profile_photo_file);
        }

        const response = await axios.post(`${BASE_URL}/profiles/me`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Profile berhasil diperbarui!');
        // Bisa update preview foto jika ingin
        if (response.data.data.profile_photo_url) {
          document.getElementById('profile_photo_preview').src =
            response.data.data.profile_photo_url;
        }
      } catch (error) {
        console.error(
          'Error updating profile:',
          error.response?.data?.message || error.message,
        );
        alert('Gagal memperbarui profile.');
      }
    });
  }, 300);

  return html;
}
