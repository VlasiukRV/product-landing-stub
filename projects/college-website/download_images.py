import os
import re
import requests
from urllib.parse import unquote, urlparse

# Налаштування
BASE_DIR = "./src"  # Папка з кодом Astro
ASSETS_DIR = "./public/images/converted" # Куди зберігати картинки
OLD_DOMAIN = "bpl.kr.ua"

# Словник для транслітерації
CYR_TO_LAT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '',
    'ю': 'iu', 'я': 'ia', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D',
    'Е': 'E', 'Є': 'Ie', 'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'I', 'Й': 'I',
    'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S',
    'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
    'Ю': 'Iu', 'Я': 'Ia'
}

def transliterate(text):
    res = ""
    for char in text:
        res += CYR_TO_LAT.get(char, char)
    # Очищаємо від усього, крім латиниці, цифр та підкреслень
    res = re.sub(r'[^a-zA-Z0-9._-]', '_', res)
    return res

if not os.path.exists(ASSETS_DIR):
    os.makedirs(ASSETS_DIR)

def process_files():
    # Шукаємо посилання на картинки (JPG, PNG, GIF, WEBP)
    url_pattern = re.compile(rf'https?://{OLD_DOMAIN}/[^\s"\')]+(?:JPG|jpg|png|jpeg|gif|webp)')

    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith((".astro", ".vue", ".js", ".ts", ".md")):
                file_path = os.path.join(root, file)

                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                urls = url_pattern.findall(content)
                if not urls:
                    continue

                new_content = content
                for url in set(urls):
                    try:
                        # Отримуємо оригінальне ім'я та транслітеруємо його
                        original_name = os.path.basename(urlparse(url).path)
                        decoded_name = unquote(original_name)
                        clean_name = transliterate(decoded_name)

                        local_path = os.path.join(ASSETS_DIR, clean_name)

                        # Завантаження
                        print(f"📥 Завантажую: {decoded_name} -> {clean_name}")
                        response = requests.get(url, timeout=10)

                        if response.status_code == 200:
                            with open(local_path, 'wb') as img_f:
                                img_f.write(response.content)

                            # Заміна посилання в коді на локальне
                            local_url = f"/images/converted/{clean_name}"
                            new_content = new_content.replace(url, local_url)
                        else:
                            print(f"❌ Помилка {response.status_code}: {url}")

                    except Exception as e:
                        print(f"⚠️ Збій на {url}: {e}")

                # Зберігаємо файл із новими шляхами
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

if __name__ == "__main__":
    process_files()
    print("\n✅ Готово! Всі зовнішні картинки замінено на локальну латиницю.")