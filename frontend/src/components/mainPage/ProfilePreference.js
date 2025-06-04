import axios from 'axios';
import { BASE_URL } from '../../config/config';

export default function ProfilePreference() {
  const accountId = localStorage.getItem('accountId');
  const accessToken = localStorage.getItem('accessToken');

  const profileUrl = `${BASE_URL}/profiles/${accountId}`;
  const photoUrl = `${profileUrl}/photo`;

  const html = `
    <div class="w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
      <form id="profile-settings-form" class="space-y-6">
        <div class="flex flex-col items-center mb-4">
          <img 
            id="profile_photo_preview" 
            src="https://via.placeholder.com/150" 
            alt="Profile Photo" 
            class="w-48 h-48 object-cover rounded-full mb-4" 
            style="border: 4px solid #2563eb;" 
          />
          <label for="profile_photo" class="block text-gray-700 font-medium mb-2 cursor-pointer">Upload Foto Profil</label>
          <input 
            type="file" 
            id="profile_photo" 
            name="profile_photo" 
            accept="image/*" 
            class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <label for="age" class="block text-gray-700 font-medium mb-1">Umur</label>
            <input type="number" id="age" name="age"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="flex-1">
            <label for="job_title" class="block text-gray-700 font-medium mb-1">Pekerjaan</label>
            <input type="text" id="job_title" name="job_title" required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <label for="about_me" class="block text-gray-700 font-medium mb-1">Tentang Saya</label>
          <textarea id="about_me" name="about_me" rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        </div>

        <button type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200">
          Simpan Perubahan
        </button>
      </form>
    </div>
  `;

  setTimeout(async () => {
    const form = document.getElementById('profile-settings-form');
    const photoInput = document.getElementById('profile_photo');
    const photoPreview = document.getElementById('profile_photo_preview');

    let isProfileExist = false;

    try {
      if (!accountId) throw new Error('accountId tidak ditemukan');

      const { data } = await axios.get(profileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profile = data.data.profile;
      if (profile) {
        isProfileExist = true;

        document.getElementById('job_title').value = profile.job_title || '';
        document.getElementById('age').value = profile.age || '';
        document.getElementById('about_me').value = profile.about_me || '';

        photoPreview.src =
          profile.profile_photo_url || 'https://via.placeholder.com/150';
      } else {
        photoPreview.src = 'https://via.placeholder.com/150';
      }
    } catch {
      console.warn('Profil tidak ditemukan, siap untuk dibuat baru.');
      photoPreview.src = 'https://via.placeholder.com/150';
    }

    photoInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        photoPreview.src = URL.createObjectURL(file);
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const job_title = document.getElementById('job_title').value.trim();
      const age = parseInt(document.getElementById('age').value);
      const about_me = document.getElementById('about_me').value.trim();
      const photoFile = photoInput.files[0];

      try {
        const profilePayload = { job_title, age, about_me };

        if (isProfileExist) {
          await axios.put(profileUrl, profilePayload, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } else {
          await axios.post(profileUrl, profilePayload, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          isProfileExist = true;
        }

        if (photoFile) {
          const formData = new FormData();
          formData.append('profile_photo', photoFile);

          await axios.post(photoUrl, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        alert('Profil berhasil disimpan!');
        location.reload();
      } catch (error) {
        console.error(error);
        const message =
          error.response?.data?.message ||
          'Terjadi kesalahan saat menyimpan profil.';
        alert(message);
      }
    });
  }, 0);

  return html;
}
