/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, Difficulty, Challenge, QuizQuestion, InterviewQuestion, ProjectSpec, LeaderboardEntry } from "./types";

export const initialCourses: Course[] = [
  {
    id: "basics",
    title: "Python Asoslari",
    difficulty: Difficulty.BEGINNER,
    description: "Dasturlash dunyosiga ilk qadam. Sintaksis, o'zgaruvchilar, operatorlar va mantiqiy shartlar.",
    iconName: "Terminal",
    modules: [
      {
        id: "m1",
        title: "Kirish va O'zgaruvchilar",
        description: "Python o'rnatish, Hello World dasturi va ma'lumot turlari.",
        lessons: [
          {
            id: "m1_l1",
            title: "Kirish va Kompyuterga O'rnatish",
            duration: "10 daqiqa",
            content: `### Python nima?
Python - bu yuqori darajali, tushunarli va ko'p qirrali dasturlash tili. U sun'iy intellekt, veb-dasturlash, ma'lumotlar tahlili va avtomatlashtirish sohasida keng qo'llaniladi.

### Hello World dasturi
Pythonda ekranga matn chiqarish uchun \`print()\` funksiyasidan foydalaniladi:
\`\`\`python
print("Salom, Dunyo!")
\`\`\`

### Dars amaliyoti:
O'ng tomondagi muharrirda (editor) \`print("Salom, Python!")\` kodini yozing va 'Run' tugmasini bosing!`,
            codeExample: `print("Salom, Dunyo!")`,
            solution: `print("Salom, Python!")`,
            exercisePrompt: "Ekranga 'Salom, Python!' matnini chiqaruvchi kod yozing.",
            testCases: [{ input: "", expectedOutput: "Salom, Python!" }]
          },
          {
            id: "m1_l2",
            title: "O'zgaruvchilar (Variables)",
            duration: "15 daqiqa",
            content: `### O'zgaruvchilar haqida
O'zgaruvchilar - bu xotiradagi ma'lumotlarni saqlash qutilari. Python dinamik tipleştirilgan tildir, ya'ni o'zgaruvchi turini oldindan ko'rsatish shart emas.

\`\`\`python
ism = "Ali"      # string (matn)
yosh = 22        # integer (butun son)
narx = 1250.50   # float (haqiqiy son)
faol = True      # boolean (mantiqiy)
\`\`\`

### Dynamic typing va formating
Python variable qiymatini formatlab chiqarish juda oson. Buning uchun \`f-string\` texnologiyasidan foydalanamiz:
\`\`\`python
print(f"Mening ismim {ism}, yoshim {yosh}da.")
\`\`\>`,
            codeExample: `ism = "Sardor"
yosh = 25
# Bu yerga f-string format kodi yozing`,
            solution: `ism = "Sardor"
yosh = 25
print(f"Mening ismim {ism}, yoshim {yosh}da.")`,
            exercisePrompt: "Sardor ismli yoshni foydalanib 'Mening ismim Sardor, yoshim 25da.' degan matnni print qiling.",
            testCases: [{ input: "", expectedOutput: "Mening ismim Sardor, yoshim 25da." }]
          },
          {
            id: "m1_l3",
            title: "Ma'lumotlar Turlari (Data Types)",
            duration: "12 daqiqa",
            content: `### Ma'lumot turlari
Pythonda quyidagi asosiy va sodda ma'lumot turlari mavjud:
1. \`str\` - Matnlar (masalan: "Python")
2. \`int\` - Butun sonlar (masalan: 42, -5)
3. \`float\` - O'nlik kasr sonlar (masalan: 3.14, -0.01)
4. \`bool\` - Mantiqiy qiymat (\`True\` yoki \`False\`)

Turlarni istalgan vaqtda \`type()\` funksiyasi bilan tekshirishingiz mumkin:
\`\`\`python
print(type(100)) # <class 'int'>
\`\`\``,
            codeExample: `# Berilgan o'zgaruvchining turini (type) print qiling.
qiymat = 99.9
# Kod yozing`,
            solution: `qiymat = 99.9
print(type(qiymat))`,
            exercisePrompt: "qiymat o'zgaruvchisining turini type(qiymat) funksiyasi orqali print qiling (Natija: <class 'float'>).",
            testCases: [{ input: "", expectedOutput: "<class 'float'>" }]
          },
          {
            id: "m1_l4",
            title: "Ro'yxatlar bilan ishlash (Lists)",
            duration: "18 daqiqa",
            content: `### Python Ro'yxatlari (Lists)
Ro'yxat bir nechta elementlarni bitta o'zgaruvchida tartiblangan va o'zgaruvchan holatda saqlash imkonini beradi:
\`\`\`python
mevalar = ["olma", "anor", "banan"]
print(mevalar[0]) # "olma"
mevalar.append("uzum") # oxiriga qo'shadi
\`\`\``,
            codeExample: `mevalar = ["olma", "anor"]
# Ro'yxat oxiriga "gilos" so'zini qo'shing va butun ro'yxatni print qiling.`,
            solution: `mevalar = ["olma", "anor"]
mevalar.append("gilos")
print(mevalar)`,
            exercisePrompt: "mevalar ro'yxatiga append() yordamida 'gilos' elementini qo'shing so'ng ro'yxatni chop eting.",
            testCases: [{ input: "", expectedOutput: "['olma', 'anor', 'gilos']" }]
          },
          {
            id: "m1_l5",
            title: "Kortej va To'plamlar (Tuples & Sets)",
            duration: "15 daqiqa",
            content: `### Kortejlar (Tuples) va To'plamlar (Sets)
Pythonda elementlarni guruhlash uchun ro'yxatdan tashqari **Tuple** va **Set** tuzilmalari ham mavjud.

1. **Tuple (Kortej)**: Elementlari o'zgartirib bo'lmaydigan (immutable) va tartiblangan to'plam. Yumaloq qavslar \`()\` yordamida yaratiladi.
\`\`\`python
koordinatalar = (41.2995, 69.2401)
# koordinatalar[0] = 42.0  # Xato! Tuple elementlarini o'zgartirib bo'lmaydi.
\`\`\`

2. **Set (To'plam)**: Elementlari tartiblanmagan va takrorlanmas (unique) bo'lgan to'plam. Gullik qavslar \`{}\` yordamida yaratiladi. Set asosan ro'yxat ichidan takrorlangan elementlarni o'chirish uchun juda foydali.
\`\`\`python
raqamlar = {1, 2, 2, 3}
print(raqamlar) # {1, 2, 3} (2 faqat bir marta chiqadi)
\`\`\``,
            codeExample: `ismlar = ["Ali", "Vali", "Ali", "Sardor", "Vali"]
# Berilgan ismlar ro'yxatidan takrorlanuvchi ismlarni o'chirish uchun
# set (to'plam) yarating va uning elementlari sonini (len) chop eting.
noyob_ismlar = set(ismlar)
# Bu yerga elementlar sonini chop qiluvchi kod yozing`,
            solution: `ismlar = ["Ali", "Vali", "Ali", "Sardor", "Vali"]
noyob_ismlar = set(ismlar)
print(len(noyob_ismlar))`,
            exercisePrompt: "noyob_ismlar to'plamining elementlari sonini (uzunligini) len() funksiyasi orqali chop eting.",
            testCases: [{ input: "", expectedOutput: "3" }]
          }
        ]
      },
      {
        id: "m2",
        title: "Sikl va Shart Operatorlari",
        description: "If/Else mantiqiy shartlari, for va while takrorlanuvchi tsikllari.",
        lessons: [
          {
            id: "m2_l1",
            title: "If, Elif va Else shartlari",
            duration: "15 daqiqa",
            content: `### Tanlash operatorlari
Pythonda shartni tekshirish uchun \`if\`, \`elif\`, \`else\` kalit so'zlaridan foydalaniladi. Indentatsiya (bo'sh joy) bu yerda juda muhimdir!

\`\`\`python
yosh = 18
if yosh >= 18:
    print("Siz ovoz bera olasiz!")
else:
    print("Hali yoshlik qilasiz.")
\`\`\`

### Juft va toq sonni aniqlash:
\`\`\`python
son = 7
if son % 2 == 0:
    print("Juft")
else:
    print("Toq")
\`\`\``,
            codeExample: `son = 10
# Shart yozing: Berilgan 'son' juft bo'lsa "Juft" deb chiqarsin, aks holda "Toq"`,
            solution: `son = 10
if son % 2 == 0:
    print("Juft")
else:
    print("Toq")`,
            exercisePrompt: "Berilgan o'zgaruvchi juft bo'lsa 'Juft' matnini chop eting.",
            testCases: [{ input: "", expectedOutput: "Juft" }]
          },
          {
            id: "m2_l2",
            title: "Sikllar (For va While)",
            duration: "20 daqiqa",
            content: `### For sikli
For sikli ma'lum bir ketma-ketlikni (ro'yxat, satr yoki raqamlar diapazoni) aylanib chiqish uchun ishlatiladi.

\`\`\`python
for i in range(1, 6):
    print(f"Takrorlanish soni: {i}")
\`\`\`

### While sikli
While sikli shart to'g'ri (True) bo'lgan muddatda kodingizni qayta-qayta ishlatadi.

\`\`\`python
sanoq = 0
while sanoq < 3:
    print("Salom")
    sanoq += 1
\`\`\``,
            codeExample: `# For yordamida 1 dan 5 gacha (5 ham kiradi) bo'lgan sonlarni ko'paytmasini (faktorial) hisoblang va chop eting.
# Masalan: 1 * 2 * 3 * 4 * 5 = 120
jami = 1
for i in range(1, 6):
    jami *= i
print(jami)`,
            solution: `jami = 1
for i in range(1, 6):
    jami *= i
print(jami)`,
            exercisePrompt: "1 dan 5 gacha bo'lgan sonlarning ko'paytmasini (faktorial) hisoblab chop etadigan kod yozing (Natija: 120 bo'lishi kerak).",
            testCases: [{ input: "", expectedOutput: "120" }]
          },
          {
            id: "m2_l3",
            title: "Funktsiyalar bilan ishlash (Functions)",
            duration: "15 daqiqa",
            content: `### Python funksiyalari
Funksiyalar - qayta-qayta foydalanish mumkin bo'lgan kod blokidir. Ular \`def\` kalit so'zi yordamida e'lon qilinadi:
\`\`\`python
def salomlash(ism):
    return f"Salom, {ism}!"
\`\`\``,
            codeExample: `# Ikki sonning ko'paytmasini hisoblaydigan ko'paytirish(a, b) funksiyasini yozing va chaqiring.`,
            solution: `def kopaytirish(a, b):
    return a * b

print(kopaytirish(5, 6))`,
            exercisePrompt: "def kopaytirish(a, b): deb nomlangan ko'paytirish funksiyasini yozing va 5 hamda 6 sonlariga chaqirib natijani chop eting (Natija: 30).",
            testCases: [{ input: "", expectedOutput: "30" }]
          },
          {
            id: "m2_l4",
            title: "Lug'atlar (Dictionaries)",
            duration: "15 daqiqa",
            content: `### Lug'atlar (key-value)
Lug'at (Dictionary) ham kalit ham qiymat (key-value) juftligiga asosan ishlaydigan tartiblanmagan tuzilmadir:
\`\`\`python
lugat = {"ism": "Olim", "yosh": 26}
print(lugat["ism"]) # "Olim"
\`\`\``,
            codeExample: `lugat = {"nomi": "Python", "loyihachi": "Guido"}
# Pythondagi 'nomi' kalitiga tegishli qiymatni print qiling.`,
            solution: `lugat = {"nomi": "Python", "loyihachi": "Guido"}
print(lugat["nomi"])`,
            exercisePrompt: "Lug'at tarkibidan 'nomi' kaliti orqali qiymatini print qiling (Natija: Python).",
            testCases: [{ input: "", expectedOutput: "Python" }]
          },
          {
            id: "m2_l5",
            title: "Xatoliklar bilan ishlash (Try-Except)",
            duration: "15 daqiqa",
            content: `### Xatoliklar bilan ishlash
Dasturlash davomida kutilmagan xatolar (masalan: foydalanuvchi son o'rniga harf kiritishi yoki nolga bo'lish) yuz berganda dastur to'xtab qolmasligi uchun \`try-except\` blokidan foydalaniladi.

\`\`\`python
try:
    # Xavfli bo'lishi mumkin bo'lgan kod
    son = int("besh")
except ValueError:
    # Xatolik yuz berganda ishlaydigan kod
    print("Son xato kiritildi!")
\`\`\`
`,
            codeExample: `# Berilgan try-except bloki ichidagi nolga bo'lish xatosini (ZeroDivisionError) ushlang va "Nolga bo'lish xatosi!" deb print qiling.
try:
    natija = 10 / 0
except:
    # Bu yerga to'g'ri except blokini yozing`,
            solution: `try:
    natija = 10 / 0
except ZeroDivisionError:
    print("Nolga bo'lish xatosi!")`,
            exercisePrompt: "try-except yordamida ZeroDivisionError xatoligini ushlab, ekranga 'Nolga bo'lish xatosi!' matnini chop eting.",
            testCases: [{ input: "", expectedOutput: "Nolga bo'lish xatosi!" }]
          },
          {
            id: "m2_l6",
            title: "Fayllar bilan ishlash (File Handling)",
            duration: "18 daqiqa",
            content: `### Fayllar bilan ishlash (File Handling)
Dasturlashda ma'lumotlarni doimiy saqlash uchun ularni faylga yozish yoki fayldan o'qish kerak bo'ladi. Pythonda bu juda qulay tarzda amalga oshiriladi.

### Faylni ochish va yopish
Fayllar bilan ishlashda hamisha faylni yopishni unutmaslik lozim. Buning uchun eng yaxshi usul - \`with open()\` blokidan foydalanishdir. Bu blok yakunida fayl avtomatik ravishda yopiladi.

Rejimlar:
* \`'r'\` - O'qish (Read)
* \`'w'\` - Yozish (Write - faylni qaytadan yaratadi yoki ustidan yozadi)
* \`'a'\` - Qo'shish (Append - fayl oxiriga ma'lumot qo'shadi)

\`\`\`python
# Faylga yozish
with open("salom.txt", "w") as fayl:
    fayl.write("Salom, Dunyo!")

# Fayldan o'qish
with open("salom.txt", "r") as fayl:
    matn = fayl.read()
    print(matn) # Salom, Dunyo!
\`\`\``,
            codeExample: `# 'data.txt' nomli fayl yarating (w rejimida), 
# unga 'Python 2026' matnini yozing.
# So'ng uni o'qib (r rejimida) print qiling.
with open("data.txt", "w") as f:
    f.write("Python 2026")

with open("data.txt", "r") as f:
    # Faylni o'qing va print qiling`,
            solution: `with open("data.txt", "w") as f:
    f.write("Python 2026")

with open("data.txt", "r") as f:
    print(f.read())`,
            exercisePrompt: "with open() yordamida data.txt faylini o'qib uning tarkibini print qiling (Natija: Python 2026).",
            testCases: [{ input: "", expectedOutput: "Python 2026" }]
          },
          {
            id: "m2_l7",
            title: "Sana va Vaqt bilan ishlash (datetime)",
            duration: "15 daqiqa",
            content: `### Sana va Vaqt (datetime moduli)
Dasturlashda deyarli har doim sana va vaqt bilan ishlashga to'g'ri keladi (masalan: foydalanuvchi qachon ro'yxatdan o'tdi, to'lov muddati qachon tugaydi va h.k.). Pythonda buning uchun maxsus built-in \`datetime\` moduli mavjud.

Asosiy klasslar:
* \`date\` - faqat sana (yil, oy, kun) uchun.
* \`time\` - faqat vaqt (soat, minut, sekund, mikrosekund) uchun.
* \`datetime\` - sana va vaqt birgalikda.
* \`timedelta\` - ikki sana yoki vaqt orasidagi farq (davomiylik).

### Hozirgi vaqtni olish va formatlash:
\`\`\`python
from datetime import datetime

hozir = datetime.now()
print(hozir) # 2026-06-06 23:15:20.123456

# Matnga o'girish (strftime - String Format Time)
matn = hozir.strftime("%d-%m-%Y")
print(matn) # 06-06-2026
\`\`\`

### Matndan sanaga o'girish (strptime - String Parse Time):
\`\`\`python
sana_matn = "2026-06-15"
sana_obj = datetime.strptime(sana_matn, "%Y-%m-%d")
print(sana_obj.year) # 2026
\`\`\``,
            codeExample: `from datetime import datetime

# Ikki xil sana matni berilgan (format: YYYY-MM-DD).
# Ular orasidagi kunlar farqini butun son (int) sifatida 
# qaytaruvchi kunlar_farqi(sana1, sana2) funksiyasini yozing.
# Maslahat: datetime.strptime orqali obyektga o'giring va ularni ayiring (.days).

def kunlar_farqi(sana1_str, sana2_str):
    # Kodni shu yerga yozing
    pass

sana1 = "2026-06-10"
sana2 = "2026-06-20"
print(kunlar_farqi(sana1, sana2))`,
            solution: `from datetime import datetime

def kunlar_farqi(sana1_str, sana2_str):
    d1 = datetime.strptime(sana1_str, "%Y-%m-%d")
    d2 = datetime.strptime(sana2_str, "%Y-%m-%d")
    return abs((d2 - d1).days)

sana1 = "2026-06-10"
sana2 = "2026-06-20"
print(kunlar_farqi(sana1, sana2))`,
            exercisePrompt: "kunlar_farqi(sana1_str, sana2_str) funksiyasini yozing, u ikki sana orasidagi kunlar farqini musbat son sifatida qaytarsin (Natija: 10).",
            testCases: [{ input: "", expectedOutput: "10" }]
          }
        ]
      }
    ]
  },
  {
    id: "oop",
    title: "Obyektga Yo'naltirilgan Dasturlash (OOP)",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Klasslar va obyektlar yaratish. OOPning 4 ustuni: Inkapsulyatsiya, Merosxo'rlik, Polimorfizm, Abstraksiya.",
    iconName: "ShieldAlert",
    modules: [
      {
        id: "m3",
        title: "Klasslar va Obyektlar",
        description: "Class yaratish va init konstruktoridan foydalanish.",
        lessons: [
          {
            id: "m3_l1",
            title: "Class va Object asoslari",
            duration: "20 daqiqa",
            content: `### Klass nima?
Klass (Class) - bu obyekt yaratish uchun qolip (blueprint). Obyekt esa shu qolipdan olingan aniq bir nusxadir.

### __init__ konstruktori:
Konstruktor klass yaratilganda avtomatik ravishda ishga tushadigan maxsus metoddir.

\`\`\`python
class Tanlov:
    def __init__(self, ism, yonalish):
        self.ism = ism
        self.yonalish = yonalish

    def maulumot(self):
        return f"{self.ism} dasturchi {self.yonalish} yo'nalishida o'qiydi."

student = Tanlov("Ali", "Backend")
print(student.maulumot())
\`\`\`

Self kalit so'zi obyektning o'ziga ishora qiladi va xotirani boshqaradi.`,
            codeExample: `class Avto:
    def __init__(self, model, rang):
        self.model = model
        self.rang = rang

    def info(self):
        return f"{self.rang} {self.model}"

# 'Cobalt' modeli va 'Oq' rangli obyekt yarating, so'ng info() metodini print qiling.`,
            solution: `class Avto:
    def __init__(self, model, rang):
        self.model = model
        self.rang = rang

    def info(self):
        return f"{self.rang} {self.model}"

mashina = Avto("Cobalt", "Oq")
print(mashina.info())`,
            exercisePrompt: "Modeli 'Cobalt', rangi 'Oq' bo'lgan Avto obyekti yaratib, info() metodini chaqiring (Natija: 'Oq Cobalt' bo'ladi).",
            testCases: [{ input: "", expectedOutput: "Oq Cobalt" }]
          },
          {
            id: "m3_l2",
            title: "Merosxo'rlik (Inheritance)",
            duration: "20 daqiqa",
            content: `### Merosxo'rlik nima?
Merosxo'rlik (Inheritance) - bu bir klass boshqa klass xususiyatlari va metodlarini o'zlashtirish imkonini beruvchi OOP ustuni.

\`\`\`python
class Shaxs:
    def __init__(self, ism):
        self.ism = ism

class Talaba(Shaxs):
    def oqiydi(self):
        return f"{self.ism} o'qimoqda."
\`\`\``,
            codeExample: `class Shaxs:
    def __init__(self, ism):
        self.ism = ism

class Dasturchi(Shaxs):
    def kod_yozadi(self):
        return f"{self.ism} kod yozadi"

# Shaxs klassidan meros olgan Dasturchi obyekti yarating ("Vali" ismli) va kod_yozadi() metodini chaqirib print qiling.`,
            solution: `class Shaxs:
    def __init__(self, ism):
        self.ism = ism

class Dasturchi(Shaxs):
    def kod_yozadi(self):
        return f"{self.ism} kod yozadi"

dev = Dasturchi("Vali")
print(dev.kod_yozadi())`,
            exercisePrompt: "Dasturchi('Vali') obyektini yarating va kod_yozadi() metodini print qiling (Natija: 'Vali kod yozadi').",
            testCases: [{ input: "", expectedOutput: "Vali kod yozadi" }]
          },
          {
            id: "m3_l3",
            title: "Amaliy Keys: Bank Hisobi (BankAccount)",
            duration: "25 daqiqa",
            content: `### OOP Amaliyot: Bank Account loyihasi
O'tgan darslarda o'rgangan Class, Object, \`__init__\` konstruktori va \`self\` kalit so'zlarini birlashtirib, hayotiy loyihani (Bank hisob raqamini boshqarish) kodini yozamiz.

Mijoz nomi va boshlang'ich balansi bo'lgan \`BankAccount\` klassini yaratamiz. Unda pul solish (\`deposit\`) va yechish (\`withdraw\`) metodlari bo'ladi.

\`\`\`python
class BankAccount:
    def __init__(self, mijoz, balans):
        self.mijoz = mijoz
        self.balans = balans

    def deposit(self, miqdor):
        self.balans += miqdor

    def withdraw(self, miqdor):
        self.balans -= miqdor
\`\`\`
`,
            codeExample: `# BankAccount klassini to'ldiring va deposit/withdraw amallarini sinab ko'ring.
class BankAccount:
    def __init__(self, mijoz, balans):
        self.mijoz = mijoz
        self.balans = balans

    def deposit(self, miqdor):
        self.balans += miqdor

    def withdraw(self, miqdor):
        if miqdor <= self.balans:
            self.balans -= miqdor
        else:
            print("Mablag' yetarli emas!")

# "Ali" ismi va 1000 so'm balans bilan hisob yarating,
# 500 so'm pul soling (deposit), keyin 200 so'm pul yeching (withdraw)
# Yakuniy balansni print qiling.`,
            solution: `class BankAccount:
    def __init__(self, mijoz, balans):
        self.mijoz = mijoz
        self.balans = balans

    def deposit(self, miqdor):
        self.balans += miqdor

    def withdraw(self, miqdor):
        if miqdor <= self.balans:
            self.balans -= miqdor
        else:
            print("Mablag' yetarli emas!")

ali_hisob = BankAccount("Ali", 1000)
ali_hisob.deposit(500)
ali_hisob.withdraw(200)
print(ali_hisob.balans)`,
            exercisePrompt: "Ali ismli 1000 balansga ega BankAccount yaratib, 500 deposit qiling va 200 withdraw qiling, so'ng yakuniy balansni chop eting (Natija: 1300).",
            testCases: [{ input: "", expectedOutput: "1300" }]
          },
          {
            id: "m3_l4",
            title: "Polimorfizm va Metodlarni Qayta Yozish (Polymorphism)",
            duration: "20 daqiqa",
            content: `### Polimorfizm (Polymorphism)
Polimorfizm - bu bir xil nomli metodlarning turli klasslarda har xil vazifalarni bajarishidir. U odatda vorislik (inheritance) bilan birga keladi va metodlarni qayta yozish (method overriding) orqali amalga oshiriladi.

Metodlarni qayta yozish - bu subclass (bola klass) superklass (ota klass) dagi metodni o'z ehtiyojiga qarab o'zgartirib qayta e'lon qilishidir.

\`\`\`python
class Hayvon:
    def tovush(self):
        return "Noma'lum tovush"

class Kuchuk(Hayvon):
    def tovush(self):
        return "Vov-vov"

class Mushuk(Hayvon):
    def tovush(self):
        return "Miyau"
\`\`\``,
            codeExample: `class Hayvon:
    def tovush(self):
        return "Noma'lum tovush"

# 1. Hayvon klassidan meros oluvchi Kuchuk klassini yarating
# 2. Unda 'tovush' metodini qayta yozib, "Vov-vov" qiymatini qaytaring (return)
# 3. Kuchuk obyektini yaratib, tovush() metodini print qiling`,
            solution: `class Hayvon:
    def tovush(self):
        return "Noma'lum tovush"

class Kuchuk(Hayvon):
    def tovush(self):
        return "Vov-vov"

rex = Kuchuk()
print(rex.tovush())`,
            exercisePrompt: "Kuchuk klassini yaratib, uning tovush() metodi 'Vov-vov' matnini qaytarishini ta'minlang va print qiling (Natija: Vov-vov).",
            testCases: [{ input: "", expectedOutput: "Vov-vov" }]
          },
          {
            id: "m3_l5",
            title: "Inkapsulyatsiya va Getter/Setter (Encapsulation)",
            duration: "22 daqiqa",
            content: `### Inkapsulyatsiya (Encapsulation)
Inkapsulyatsiya - bu obyekt ma'lumotlarini (o'zgaruvchilarini) tashqaridan to'g'ridan-to'g'ri o'zgartirishdan himoyalash va ularga faqat maxsus metodlar orqali murojaat qilishni ta'minlashdir.

Pythonda o'zgaruvchini himoyalash uchun:
* Bitta underscore (\`_nomi\`) - protected (himoyalangan, faqat subclasslarda foydalanish tavsiya etiladi).
* Ikkita underscore (\`__nomi\`) - private (xususiy, klass tashqarisidan unga to'g'ridan-to'g'ri kirib bo'lmaydi).

Maxfiy o'zgaruvchilarni olish va o'zgartirish uchun \`@property\` (getter) va \`@getter_nomi.setter\` (setter) dekoratorlaridan foydalanamiz:

\`\`\`python
class Shaxs:
    def __init__(self, ism):
        self.__ism = ism # private variable

    @property
    def ism(self):
        return self.__ism

    @ism.setter
    def ism(self, yangi_ism):
        if len(yangi_ism) > 1:
            self.__ism = yangi_ism
\`\`\``,
            codeExample: `class BankHisobi:
    def __init__(self, balans):
        self.__balans = balans  # private o'zgaruvchi

    # 1. @property dekoratori yordamida 'balans' getterni yozing (u __balans ni qaytarsin)
    # 2. Hisob yaratib, balansni print qiling.`,
            solution: `class BankHisobi:
    def __init__(self, balans):
        self.__balans = balans

    @property
    def balans(self):
        return self.__balans

hisob = BankHisobi(2500)
print(hisob.balans)`,
            exercisePrompt: "BankHisobi klassida balans getterini property sifatida e'lon qilib, 2500 balansli obyekt yarating va balansini chop eting (Natija: 2500).",
            testCases: [{ input: "", expectedOutput: "2500" }]
          },
          {
            id: "m3_l6",
            title: "Abstraksiya va Abstrakt Klasslar (Abstraction)",
            duration: "25 daqiqa",
            content: `### Abstraksiya (Abstraction)
Abstraksiya - bu murakkab tizimning faqat kerakli qismini ko'rsatib, ichki amalga oshirish detallarini yashirishdir. 

Pythonda abstrakt klass va metodlar yaratish uchun \`abc\` (Abstract Base Classes) modulidan foydalaniladi. Abstrakt klassdan to'g'ridan-to'g'ri obyekt olib bo'lmaydi. Subclasslar esa undagi barcha abstrakt metodlarni majburiy ravishda realizatsiya qilishi (yozishi) shart.

\`\`\`python
from abc import ABC, abstractmethod

class Shakl(ABC):
    @abstractmethod
    def yuza(self):
        pass

class Doira(Shakl):
    def __init__(self, radius):
        self.radius = radius
    def yuza(self):
        return 3.14 * (self.radius ** 2)
\`\`\``,
            codeExample: `from abc import ABC, abstractmethod

class Shakl(ABC):
    @abstractmethod
    def yuza(self):
        pass

# 1. Shakl klassidan meros olgan Tortburchak klassini yarating.
# 2. Konstruktorda eni va boyi parametrlarini qabul qilsin.
# 3. yuza() metodini realizatsiya qiling (eni * boyi).
# 4. Eni 5, bo'yi 4 bo'lgan Tortburchak yaratib, yuzasini print qiling.`,
            solution: `from abc import ABC, abstractmethod

class Shakl(ABC):
    @abstractmethod
    def yuza(self):
        pass

class Tortburchak(Shakl):
    def __init__(self, eni, boyi):
        self.eni = eni
        self.boyi = boyi
    def yuza(self):
        return self.eni * self.boyi

t = Tortburchak(5, 4)
print(t.yuza())`,
            exercisePrompt: "Tortburchak(5, 4) obyekti yuzasini hisoblab print qiling (Natija: 20).",
            testCases: [{ input: "", expectedOutput: "20" }]
          },
          {
            id: "m3_l7",
            title: "Dunder/Magic Metodlar",
            duration: "20 daqiqa",
            content: `### Dunder (Double Underscore) yoki Magic metodlar
Dunder metodlar - bu ikki tomondan ikkita pastki chiziq bilan o'ralgan maxsus metodlardir (masalan \`__init__\`). Ular klass obyektlariga standart Python operatorlari (qo'shish, satrga o'girish, uzunlikni aniqlash va h.k.) bilan ishlash imkonini beradi.

Mashhur dunder metodlar:
* \`__str__(self)\` - Obyektni \`print()\` qilganda yoki \`str()\` ga o'girganda qanday matn chiqishini belgilaydi.
* \`__len__(self)\` - Obyekt ustida \`len()\` funksiyasi chaqirilganda qaytadigan qiymat.
* \`__add__(self, boshqa)\` - Ikkita obyektni \`+\` operatori bilan qo'shganda ishlaydigan mantiq.

\`\`\`python
class Kitob:
    def __init__(self, nom, sahifa):
        self.nom = nom
        self.sahifa = sahifa
    def __str__(self):
        return f"'{self.nom}' kitobi"
    def __len__(self):
        return self.sahifa

k = Kitob("Python Darslari", 320)
print(k)      # 'Python Darslari' kitobi
print(len(k)) # 320
\`\`\``,
            codeExample: `class Kitob:
    def __init__(self, nom, sahifa):
        self.nom = nom
        self.sahifa = sahifa

    # 1. __str__ metodini yozing, u "'{nom}'" shaklida qaytarsin.
    # 2. __len__ metodini yozing, u sahifalar sonini (sahifa) qaytarsin.
    # Kitob("Alkimyogar", 180) obyektini yarating va print(k) hamda print(len(k)) qiling.`,
            solution: `class Kitob:
    def __init__(self, nom, sahifa):
        self.nom = nom
        self.sahifa = sahifa
    def __str__(self):
        return f"'{self.nom}'"
    def __len__(self):
        return self.sahifa

k = Kitob("Alkimyogar", 180)
print(k)
print(len(k))`,
            exercisePrompt: "Kitob('Alkimyogar', 180) yaratib, uning __str__ va __len__ natijalarini alohida-alohida print qiling (Natijalar: 'Alkimyogar' va 180).",
            testCases: [{ input: "", expectedOutput: "'Alkimyogar'\n180" }]
          }
        ]
      }
    ]
  },
  {
    id: "advanced_python",
    title: "Kengaytirilgan Python & Web API",
    difficulty: Difficulty.ADVANCED,
    description: "Dekoratorlar, Generatorlar, Multithreading hamda Django va FastAPI freymvorklari bilan mukammal API yozish.",
    iconName: "Cpu",
    modules: [
      {
        id: "m4",
        title: "Dekoratorlar va Generatorlar",
        description: "Funktsiyalarni kengaytirish va xotirani tejash metodlari.",
        lessons: [
          {
            id: "m4_l1",
            title: "Python Dekoratorlari (Decorators)",
            duration: "25 daqiqa",
            content: `### Dekoratorlar nima?
Dekorator - bu boshqa bir funksiyaning xulq-atvorini o'zgartirmasdan, uning ustiga qo'shimcha funksionallik (wrapper) qoshish imkonini beruvchi kuchli vositadir.

Sintaksi \`@dekorator_nomi\` shaklida yoziladi.

\`\`\`python
def mening_dekoratorim(func):
    def wrapper():
        print("--- Ishga tushishdan oldin ---")
        func()
        print("--- Ishga tushgandan keyin ---")
    return wrapper

@mening_dekoratorim
def salom():
    print("Salom, Dunyo!")

salom()
\`\`\`

Ushbu kod ishga tushganda, dastlab drayver matni, keyin asosiy funksiya ishlaydi!`,
            codeExample: `def tag_p(func):
    def wrapper():
        return f"<p>{func()}</p>"
    return wrapper

@tag_p
def text_generate():
    return "Python"

print(text_generate())`,
            solution: `def tag_p(func):
    def wrapper():
        return f"<p>{func()}</p>"
    return wrapper

@tag_p
def text_generate():
    return "Python"

print(text_generate())`,
            exercisePrompt: "Dekorator kodingizni tekshirish uchun Run tugmasini bosing va natijani ko'ring (<p>Python</p>).",
            testCases: [{ input: "", expectedOutput: "<p>Python</p>" }]
          },
          {
            id: "m4_l2",
            title: "Python Generatorlari (Generators)",
            duration: "20 daqiqa",
            content: `### Generatorlar va yield
Generatorlar - barcha natijalarni birdaniga xotiraga yuklamasdan, ularni elementma-element 'yield' kalit so'zi yordamida sekinlik bilan ishlab beruvchi funksiyalardir. Xotirani tejashda mislsiz foydali.

\`\`\`python
def sonlar_generatori():
    yield 1
    yield 2
\`\`\``,
            codeExample: `def generator_funksiya():
    yield "A"
    yield "B"

for element in generator_funksiya():
    print(element)`,
            solution: `def generator_funksiya():
    yield "A"
    yield "B"

for element in generator_funksiya():
    print(element)`,
            exercisePrompt: "Generator kodingizni tekshirish uchun Run tugmasini bosing va har bir element chop etilishini kuzating (A keyin B).",
            testCases: [{ input: "", expectedOutput: "A\nB" }]
          }
        ]
      },
      {
        id: "m5",
        title: "Veb Freymvorklar va API",
        description: "FastAPI, Flask va Django freymvorklarining ishlash prinsiplari va xususiyatlari.",
        lessons: [
          {
            id: "m5_l1",
            title: "FastAPI va Ma'lumotlar Validatsiyasi",
            duration: "20 daqiqa",
            content: `### FastAPI va Pydantic Validatsiyasi
FastAPI - bu zamonaviy, juda tezkor va ma'lumotlar validatsiyasini (tekshirishni) Pydantic orqali amalga oshiradigan veb-ramka (framework). 

Veb API yozishda eng muhim narsa - bu kiruvchi ma'lumotlarning to'g'riligini tekshirishdir. Buning uchun FastAPI dasturchilardan Pydantic-ning \`BaseModel\` klassidan foydalanishni talab qiladi.

Biz bu darsda FastAPI-ning asosiy validatsiya g'oyasini o'rganamiz: foydalanuvchidan kelayotgan JSON ma'lumotlarini (Dictionary ko'rinishida) tekshirib, xatolarni aniqlaymiz.`,
            codeExample: `# Foydalanuvchi ma'lumotlarini tekshiruvchi funksiyani yozing.
# Qoidalar: 
# 1. 'username' matn turida (str) va uzunligi kamida 4 ta belgidan iborat bo'lishi kerak.
# 2. 'age' butun son (int) va 18 dan 100 gacha bo'lishi kerak.
# Agar hammasi to'g'ri bo'lsa, "Valid User" deb chop eting. 
# Xato bo'lsa, mos ravishda "Invalid Username" yoki "Invalid Age" deb chop eting.

def validate_user(data):
    # Kodni shu yerdan yozing
    pass

# Test uchun ma'lumot
user_data = {"username": "nodir", "age": 25}
validate_user(user_data)`,
            solution: `def validate_user(data):
    if not isinstance(data.get("username"), str) or len(data.get("username", "")) < 4:
        print("Invalid Username")
        return
    if not isinstance(data.get("age"), int) or not (18 <= data.get("age", 0) <= 100):
        print("Invalid Age")
        return
    print("Valid User")

user_data = {"username": "nodir", "age": 25}
validate_user(user_data)`,
            exercisePrompt: "validate_user(data) funksiyasini yozing. U username uzunligi >= 4 va age 18-100 oralig'ida bo'lishini tekshirsin va to'g'ri bo'lsa 'Valid User' matnini chop etsin (Natija: Valid User).",
            testCases: [{ input: "", expectedOutput: "Valid User" }]
          },
          {
            id: "m5_l2",
            title: "Flask va Marshrutlash (Routing) Asoslari",
            duration: "20 daqiqa",
            content: `### Flask va Marshrutlash (Routing)
Flask - Python-da veb-ilovalarni tezda yaratish uchun eng ommabop mikroramkalardan (microframework) biridir. 

Flask-ning eng katta afzalliklaridan biri - bu dekoratorlar yordamida URL marshrutlarini (routing) belgilashdir:
\`\`\`python
@app.route("/home")
def home():
    return "Bosh sahifa"
\`\`\`

Ushbu darsda biz Flask qanday qilib URL-larni tegishli funksiyalarga bog'lashini tushunish uchun sodda marshrutlash tizimini klass yordamida o'zimiz yaratamiz.`,
            codeExample: `# SimpleRouter klassini yarating. Unda marshrutlarni saqlash uchun lug'at (dict) bo'lsin.
# 1. @route(path) dekoratori funksiyani o'z lug'atida path (yo'l) kaliti bilan saqlasin.
# 2. resolve(path) metodi berilgan yo'l bo'yicha funksiyani ishga tushirib natijani qaytarsin.

class SimpleRouter:
    def __init__(self):
        self.routes = {}

    def route(self, path):
        def decorator(func):
            # Funksiyani routes lug'atiga saqlang
            self.routes[path] = func
            return func
        return decorator

    def resolve(self, path):
        # Berilgan path bo'yicha funksiyani chaqiring va qaytaring
        if path in self.routes:
            return self.routes[path]()
        return "404 Not Found"

router = SimpleRouter()

@router.route("/home")
def home_page():
    return "Xush kelibsiz!"

# resolve orqali home_page natijasini print qiling
print(router.resolve("/home"))`,
            solution: `class SimpleRouter:
    def __init__(self):
        self.routes = {}

    def route(self, path):
        def decorator(func):
            self.routes[path] = func
            return func
        return decorator

    def resolve(self, path):
        if path in self.routes:
            return self.routes[path]()
        return "404 Not Found"

router = SimpleRouter()

@router.route("/home")
def home_page():
    return "Xush kelibsiz!"

print(router.resolve("/home"))`,
            exercisePrompt: "SimpleRouter dekoratori va resolve metodini to'g'ri yozib, /home yo'nalishi chaqirilganda 'Xush kelibsiz!' matnini print qiling (Natija: Xush kelibsiz!).",
            testCases: [{ input: "", expectedOutput: "Xush kelibsiz!" }]
          },
          {
            id: "m5_l3",
            title: "Django ORM va Ma'lumotlar Modelini loyihalash",
            duration: "25 daqiqa",
            content: `### Django ORM va SQL So'rovlari
Django - Python-ning eng kuchli va keng qamrovli veb-ramkasidir. Uning eng kuchli komponentlaridan biri bu **ORM (Object-Relational Mapping)** hisoblanadi.

ORM yordamida dasturchi SQL so'rovlarini (masalan, \`SELECT * FROM users\`) yozmasdan, to'g'ridan-to'g'ri Python klasslari va obyektlari orqali ma'lumotlar bazasi bilan ishlaydi:
\`\`\`python
# Faol foydalanuvchilarni olish
active_users = User.objects.filter(active=True)
\`\`\`

Ushbu darsda biz Django ORM-ning filter() va ma'lumotlarni saralash g'oyasini sodda klass orqali yaratib ko'ramiz.`,
            codeExample: `# Berilgan foydalanuvchilar ro'yxatidan faqat active=True yoki active=False bo'lganlarni
# filter qilib qaytaruvchi User.filter(active) klass metodini yozing.

database_records = [
    {"username": "anvar", "active": True},
    {"username": "sarvar", "active": False},
    {"username": "kamola", "active": True}
]

class User:
    @classmethod
    def filter(cls, active):
        # Database_records ichidan active holati mos keladigan username'larni
        # ro'yxat (list) ko'rinishida qaytaring
        pass

# active=True bo'lgan foydalanuvchilar ismlarini print qiling
print(User.filter(active=True))`,
            solution: `database_records = [
    {"username": "anvar", "active": True},
    {"username": "sarvar", "active": False},
    {"username": "kamola", "active": True}
]

class User:
    @classmethod
    def filter(cls, active):
        return [r["username"] for r in database_records if r["active"] == active]

print(User.filter(active=True))`,
            exercisePrompt: "User klassining filter(cls, active) metodini yozing, u database_records-dagi active holatiga mos keladigan foydalanuvchilar ro'yxatini qaytarsin (Natija: ['anvar', 'kamola']).",
            testCases: [{ input: "", expectedOutput: "['anvar', 'kamola']" }]
          }
        ]
      },
      {
        id: "m6",
        title: "Asinxron Dasturlash va Kengaytirilgan Mavzular",
        description: "Asyncio, ko'p oqimli dasturlash, kontekst menejerlari va metaklasslar.",
        lessons: [
          {
            id: "m6_l1",
            title: "Asinxron Dasturlash (async/await va asyncio)",
            duration: "25 daqiqa",
            content: `### Asinxron dasturlash nima?
Asinxron dasturlash - bu dasturni I/O (kirish-chiqish) jarayonlari bloklanib qolmasdan parallel ravishda boshqa vazifalarni bajarishiga imkon beruvchi yondashuvdir. U bir oqimli (single-threaded) Voqealar Sikliga (Event Loop) asoslanadi.

Asosiy tushunchalar:
* \`async def\` - asinxron funksiyani (coroutine) e'lon qilish.
* \`await\` - asinxron operatsiyaning (masalan tarmoqdan yuklash) natijasini kutish. Bu vaqtda boshqa asinxron funksiyalar ishlashi mumkin.
* \`asyncio.run()\` - coroutine'ni ishga tushirish.

\`\`\`python
import asyncio

async def yuklash():
    print("Yuklash boshlandi...")
    await asyncio.sleep(1) # 1 soniya kutish (bloklamasdan)
    print("Yuklash tugadi!")

asyncio.run(yuklash())
\`\`\``,
            codeExample: `import asyncio

async def salom():
    # 1. Asinxron ravishda "Salom" deb yozing
    # 2. asyncio.sleep(0.5) orqali 0.5 soniya kuting (await dan foydalaning)
    # 3. "Dunyo!" deb yozing
    print("Salom")
    # Kod yozing
    print("Dunyo!")

asyncio.run(salom())`,
            solution: `import asyncio

async def salom():
    print("Salom")
    await asyncio.sleep(0.5)
    print("Dunyo!")

asyncio.run(salom())`,
            exercisePrompt: "asyncio.sleep(0.5) kutishini await yordamida yozing (Natija: Salom keyin Dunyo!).",
            testCases: [{ input: "", expectedOutput: "Salom\nDunyo!" }]
          },
          {
            id: "m6_l2",
            title: "Ko'p Oqimli va Ko'p Jarayonli Dasturlash",
            duration: "25 daqiqa",
            content: `### Multithreading vs Multiprocessing
Python-da concurrency (parallel) ishlashning ikkita asosiy yo'li bor:

1. **Multithreading (Ko'p oqimlilik)**: Bitta jarayon ichida bir nechta oqim yaratish. Oqimlar umumiy xotirani bo'lishadi. Python-da **GIL (Global Interpreter Lock)** sababli, faqat bitta oqim bir vaqtning o'zida Python baytkodini ishga tushira oladi. Shuning uchun multithreading asosan I/O-bound (tarmoq yoki fayl kutish) vazifalar uchun foydalidir.
2. **Multiprocessing (Ko'p jarayonlilik)**: Har biri o'z shaxsiy xotirasiga va Python interpretatoriga ega bo'lgan alohida jarayonlarni ishga tushirish. GIL cheklovini aylanib o'tadi va CPU-bound (og'ir matematik hisob-kitoblar) vazifalar uchun eng yaxshisidir.

\`\`\`python
import threading
import time

def ish():
    print("Oqim ishlamoqda...")

t = threading.Thread(target=ish)
t.start()
t.join()
\`\`\``,
            codeExample: `import threading

# 1. 'salomlash' funksiyasini yozing, u "Oqimdan salom!" deb print qilsin.
# 2. Shu funksiyani bajaruvchi threading.Thread oqimini yarating.
# 3. Oqimni start() orqali ishga tushiring va join() orqali yakunlanishini kuting.
def salomlash():
    print("Oqimdan salom!")

t = threading.Thread(target=salomlash)
t.start()
t.join()`,
            solution: `import threading

def salomlash():
    print("Oqimdan salom!")

t = threading.Thread(target=salomlash)
t.start()
t.join()`,
            exercisePrompt: "Threading yordamida oqim yaratib uni ishga tushiring (Natija: Oqimdan salom!).",
            testCases: [{ input: "", expectedOutput: "Oqimdan salom!" }]
          },
          {
            id: "m6_l3",
            title: "Kontekst Menejerlari (Context Managers)",
            duration: "20 daqiqa",
            content: `### Kontekst Menejerlari va 'with'
Kontekst menejerlari resurslar (fayllar, bazalar, qulflar) ochilganda ularni ishlatib bo'lingach, albatta yopilishini (tozalanishini) kafolatlaydigan tuzilmadir.

Klassda kontekst menejeri yaratish uchun ikkita dunder metod realizatsiya qilinishi kerak:
1. \`__enter__(self)\` - \`with\` bloki boshlanishida ishlaydi va resursni qaytaradi.
2. \`__exit__(self, exc_type, exc_val, exc_tb)\` - \`with\` bloki tugaganda (xatolik yuz bersa ham) ishlaydi va resursni yopadi.

\`\`\`python
class MeningKontekstim:
    def __enter__(self):
        print("Kirish")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Chiqish")

with MeningKontekstim():
    print("Ish bajarilmoqda")
# Natija:
# Kirish
# Ish bajarilmoqda
# Chiqish
\`\`\``,
            codeExample: `class LogMenejer:
    def __enter__(self):
        print("Boshlandi")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Tugadi")

# LogMenejer kontekst menejerini with operatori orqali ochib,
# uning ichida "Bajarilmoqda" matnini chop eting.`,
            solution: `class LogMenejer:
    def __enter__(self):
        print("Boshlandi")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Tugadi")

with LogMenejer():
    print("Bajarilmoqda")`,
            exercisePrompt: "with operatori yordamida LogMenejer kontekstini ochib, ichida 'Bajarilmoqda' matnini print qiling (Natija: Boshlandi, keyin Bajarilmoqda, keyin Tugadi).",
            testCases: [{ input: "", expectedOutput: "Boshlandi\nBajarilmoqda\nTugadi" }]
          },
          {
            id: "m6_l4",
            title: "Metaklasslar va Klasslar Dinamikasi (Metaclasses)",
            duration: "25 daqiqa",
            content: `### Metaklasslar (Metaclasses)
Python-da hamma narsa obyektdir, jumladan klasslar ham. Klass yaratilganda u ham qaysidir metaklassning (odatda \`type\` ning) obyekti sifatida vujudga keladi.

Metaklass - bu boshqa klasslarni yaratuvchi va ularning tuzilishini nazorat qiluvchi klass. U \`type\` klassidan meros oladi va \`__new__\` yoki \`__init__\` metodlarini qayta yozadi.

\`\`\`python
class SalomMetaklass(type):
    def __new__(cls, name, bases, dct):
        # Yaratilayotgan klassga yangi metod qo'shish
        dct['salom'] = lambda self: "Assalomu alaykum"
        return super().__new__(cls, name, bases, dct)

class Talaba(metaclass=SalomMetaklass):
    pass

t = Talaba()
print(t.salom()) # Assalomu alaykum
\`\`\``,
            codeExample: `class PrefixMetaclass(type):
    def __new__(cls, name, bases, dct):
        # Yaratilayotgan klassga 'prefix_name' atributini qo'shib unga name (klass nomi) qiymatini bering
        dct['prefix_name'] = f"Klass: {name}"
        return super().__new__(cls, name, bases, dct)

class Shaxs(metaclass=PrefixMetaclass):
    pass

# Shaxs obyektini yaratib uning 'prefix_name' atributini chop eting.
s = Shaxs()
# Kodni davom ettiring`,
            solution: `class PrefixMetaclass(type):
    def __new__(cls, name, bases, dct):
        dct['prefix_name'] = f"Klass: {name}"
        return super().__new__(cls, name, bases, dct)

class Shaxs(metaclass=PrefixMetaclass):
    pass

s = Shaxs()
print(s.prefix_name)`,
            exercisePrompt: "Shaxs obyektining prefix_name atributini print qiling (Natija: Klass: Shaxs).",
            testCases: [{ input: "", expectedOutput: "Klass: Shaxs" }]
          }
        ]
      }
    ]
  },
  {
    id: "practical_libraries",
    title: "Amaliy Kutubxonalar & Testlash",
    difficulty: Difficulty.ADVANCED,
    description: "Requests, BeautifulSoup, NumPy, Pandas va PyTest kutubxonalari bilan amaliy dasturlar yozish va testlash.",
    iconName: "Server",
    modules: [
      {
        id: "m7",
        title: "Tashqi API va Web Scraping",
        description: "Tashqi HTTP so'rovlar, JSON API ulanish va HTML ma'lumotlarni yig'ish.",
        lessons: [
          {
            id: "m7_l1",
            title: "API va JSON bilan ishlash (Requests)",
            duration: "20 daqiqa",
            content: `### API va JSON bilan ishlash (Requests)
Real dunyoda dasturlar boshqa dasturlar yoki serverlar bilan ma'lumot almashadi. Bu jarayon **API (Application Programming Interface)** deb ataladi. API-lar orqali keladigan ma'lumotlarning aksariyati **JSON** formatida bo'ladi.

Pythonda API-larga so'rov yuborish uchun eng ko'p ishlatiladigan paket - bu \`requests\` paketi hisoblanadi.

HTTP so'rov turlari:
* **GET** - Serverdan ma'lumot olish.
* **POST** - Serverga yangi ma'lumot yuborish.

\`\`\`python
import requests

response = requests.get("https://api.github.com/users/octocat")
if response.status_code == 200:
    user_data = response.json()
    print(user_data["name"])
\`\`\`

Ushbu darsda, internet ulanishisiz API javoblarini (JSON matnlarini) parse qilish va qayta ishlash uchun Pythonning built-in \`json\` modulidan foydalanishni o'rganamiz.`,
            codeExample: `import json

# Foydalanuvchilar haqidagi JSON ma'lumot berilgan.
# Undan barcha foydalanuvchilarning email manzillarini 
# ro'yxat (list) ko'rinishida qaytaruvchi extract_emails(json_str) funksiyasini yozing.

def extract_emails(json_str):
    # json_str ni yuklab, email'larni ro'yxat qilib qaytaring
    pass

json_data = '{"users": [{"name": "Anvar", "email": "anvar@mail.com"}, {"name": "Kamola", "email": "kamola@mail.com"}]}'
print(extract_emails(json_data))`,
            solution: `import json

def extract_emails(json_str):
    data = json.loads(json_str)
    return [user["email"] for user in data["users"]]

json_data = '{"users": [{"name": "Anvar", "email": "anvar@mail.com"}, {"name": "Kamola", "email": "kamola@mail.com"}]}'
print(extract_emails(json_data))`,
            exercisePrompt: "extract_emails(json_str) funksiyasini yozing, u JSON matnidan email'larni ro'yxat qilib qaytarsin (Natija: ['anvar@mail.com', 'kamola@mail.com']).",
            testCases: [{ input: "", expectedOutput: "['anvar@mail.com', 'kamola@mail.com']" }]
          },
          {
            id: "m7_l2",
            title: "HTML Scraping va Matn extraction",
            duration: "20 daqiqa",
            content: `### Web Scraping asoslari
**Web Scraping** (Veb-skreping) - bu veb-sahifalardan ma'lumotlarni dasturiy ravishda yuklab olish va keraksiz kodlardan ajratib tozalash jarayonidir. Python-da bu uchun \`beautifulsoup4\` va \`scrapy\` kutubxonalari keng qo'llaniladi.

BeautifulSoup yordamida HTML tarkibini osongina daraxt tuzilmasiga o'tkazish va teglarni qidirish mumkin:
\`\`\`python
from bs4 import BeautifulSoup

html = "<html><body><h1>Salom Dunyo</h1></body></html>"
soup = BeautifulSoup(html, "html.parser")
print(soup.h1.text) # Salom Dunyo
\`\`\`

Biz esa bu jarayonni o'rganish uchun, HTML matn ichidagi ma'lumotlarni qidirishda juda kuchli hisoblangan built-in muntazam ifodalar - \`re\` (Regular Expressions) moduli yordamida havolalarni ajratib olishni mashq qilamiz.`,
            codeExample: `import re

# Berilgan HTML matni tarkibidagi barcha havolalarni (href qiymatlarini)
# topib qaytaruvchi extract_links(html) funksiyasini yozing.
# Masalan: href="https://example.com" dan 'https://example.com' ni olish kerak.

def extract_links(html):
    # re.findall() yordamida href qiymatlarini toping
    pass

html_markup = '<p>Batafsil <a href="https://kun.uz">Kun.uz</a> yoki <a href="https://daryo.uz">Daryo</a> saytida.</p>'
print(extract_links(html_markup))`,
            solution: `import re

def extract_links(html):
    return re.findall(r'href="([^"]+)"', html)

html_markup = '<p>Batafsil <a href="https://kun.uz">Kun.uz</a> yoki <a href="https://daryo.uz">Daryo</a> saytida.</p>'
print(extract_links(html_markup))`,
            exercisePrompt: "re.findall() yordamida href attribute qiymatlarini ajratib oluvchi extract_links(html) funksiyasini yozing (Natija: ['https://kun.uz', 'https://daryo.uz']).",
            testCases: [{ input: "", expectedOutput: "['https://kun.uz', 'https://daryo.uz']" }]
          }
        ]
      },
      {
        id: "m8",
        title: "Ma'lumotlar Tahlili (Pandas & NumPy)",
        description: "Pandas va NumPy kutubxonalari yordamida ma'lumotlar bilan ishlash, filtrlash va statistik tahlillar.",
        lessons: [
          {
            id: "m8_l1",
            title: "NumPy va Vektorli amallar asoslari",
            duration: "22 daqiqa",
            content: `### NumPy nima?
**NumPy** (Numerical Python) - Python-da ilmiy va matematik hisob-kitoblar uchun asosiy kutubxonadir. Uning markazida ko'p o'lchovli massivlar - **ndarray** turadi.

NumPy oddiy ro'yxatlarga qaraganda 100 martagacha tezroq ishlaydi, chunki uning ostidagi barcha hisob-kitoblar C tilida yozilgan va xotira ketma-ket joylashgan (Vectorization).

Massiv ustida amal bajarish:
\`\`\`python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a * b) # [4, 10, 18] - elementma-element ko'paytirish
print(np.dot(a, b)) # 32 - skalyar ko'paytma (dot product)
\`\`\`

Keling, NumPy qanday ishlashini yaxshiroq tushunish uchun ikki ro'yxatning skalyar ko'paytmasini (dot product) pure Python-da vektorli usulda yozib chiqamiz.`,
            codeExample: `# Ikki bir xil o'lchamli sonlar ro'yxatining skalyar ko'paytmasini
# (dot product) hisoblaydigan dot_product(vec1, vec2) funksiyasini yozing.
# Formula: vec1[0]*vec2[0] + vec1[1]*vec2[1] + ...

def dot_product(vec1, vec2):
    # zip() yordamida elementlarni birma-bir ko'paytirib yig'indisini toping
    pass

print(dot_product([1, 2, 3], [4, 5, 6]))`,
            solution: `def dot_product(vec1, vec2):
    return sum(a * b for a, b in zip(vec1, vec2))

print(dot_product([1, 2, 3], [4, 5, 6]))`,
            exercisePrompt: "Ikki ro'yxatning skalyar ko'paytmasini (dot product) sum() va zip() yordamida hisoblab print qiling (Natija: 32).",
            testCases: [{ input: "", expectedOutput: "32" }]
          },
          {
            id: "m8_l2",
            title: "Pandas va CSV ma'lumotlar tahlili",
            duration: "25 daqiqa",
            content: `### Pandas nima?
**Pandas** - ma'lumotlarni tahlil qilish va qayta ishlash uchun eng mahhur kutubxonadir. U jadvalli ma'lumotlar bilan ishlash uchun ikki asosiy strukturani taqdim etadi:
1. **Series** - bir o'lchovli ustun.
2. **DataFrame** - ikki o'lchovli jadval (Excel kabi).

Excel yoki CSV fayllarni o'qish Pandas-da juda oddiy:
\`\`\`python
import pandas as pd

df = pd.read_csv("maulumotlar.csv")
print(df.describe()) # asosiy statistik ko'rsatkichlar
print(df[df["yosh"] > 30]) # filtrlash
\`\`\``,
            codeExample: `import csv
import io

# Berilgan CSV matnidan foydalanib barcha shaxslarning 
# o'rtacha yoshini (average age) hisoblovchi average_age(csv_str) funksiyasini yozing.
# Python-ning built-in 'csv' modulidan foydalaning.

def average_age(csv_str):
    f = io.StringIO(csv_str.strip())
    reader = csv.DictReader(f)
    # Yoshlarni yig'ib o'rtachasini toping
    pass

csv_data = """name,age
Ali,25
Vali,35
Sardor,30"""

print(average_age(csv_data))`,
            solution: `import csv
import io

def average_age(csv_str):
    f = io.StringIO(csv_str.strip())
    reader = csv.DictReader(f)
    ages = [int(row["age"]) for row in reader]
    return sum(ages) / len(ages)

csv_data = """name,age
Ali,25
Vali,35
Sardor,30"""

print(average_age(csv_data))`,
            exercisePrompt: "Foydalanuvchilarning o'rtacha yoshini csv.DictReader yordamida hisoblab, float qiymatda qaytaring (Natija: 30.0).",
            testCases: [{ input: "", expectedOutput: "30.0" }]
          }
        ]
      },
      {
        id: "m9",
        title: "Dasturni Testlash (Unit Testing)",
        description: "Kodni test-driven usulda yozish, unittest built-in kutubxonasi va asertlar.",
        lessons: [
          {
            id: "m9_l1",
            title: "Unittest orqali Unit testlar yozish",
            duration: "25 daqiqa",
            content: `### Kodni testlash (Unit Testing)
Professional dasturiy ta'minot yaratishda kodning to'g'ri ishlashini avtomatik tekshiradigan testlar yozish juda muhimdir. **Unit test** - bu kodning eng kichik bo'lagini (odatda funksiya yoki metodni) alohida tekshiruvchi testdir.

Pythonda bu uchun built-in \`unittest\` kutubxonasi mavjud.

Test klassi yaratish uchun \`unittest.TestCase\` dan meros olinadi. Test metodlari nomi esa albatta \`test_\` so'zi bilan boshlanishi kerak:
\`\`\`python
import unittest

def qoshish(a, b):
    return a + b

class TestMath(unittest.TestCase):
    def test_qoshish(self):
        self.assertEqual(qoshish(2, 3), 5)
        self.assertEqual(qoshish(-1, 1), 0)
\`\`\``,
            codeExample: `import unittest

# 1. Ikki sonni ko'paytiruvchi kopaytirish(a, b) funksiyasini yozing.
# 2. unittest.TestCase dan meros olgan TestKopaytirish klassini yarating.
# 3. Uning ichida test_kopaytirish(self) metodini yozib,
#    self.assertEqual() yordamida 3 * 4 = 12 va -1 * 5 = -5 ekanini tekshiring.

def kopaytirish(a, b):
    return a * b

# Test klassini yozing:
class TestKopaytirish(unittest.TestCase):
    pass

# Testlarni ishga tushiramiz:
suite = unittest.TestLoader().loadTestsFromTestCase(TestKopaytirish)
runner = unittest.TextTestRunner(verbosity=0)
result = runner.run(suite)
print("Tests passed:", result.wasSuccessful())`,
            solution: `import unittest

def kopaytirish(a, b):
    return a * b

class TestKopaytirish(unittest.TestCase):
    def test_kopaytirish(self):
        self.assertEqual(kopaytirish(3, 4), 12)
        self.assertEqual(kopaytirish(-1, 5), -5)

suite = unittest.TestLoader().loadTestsFromTestCase(TestKopaytirish)
runner = unittest.TextTestRunner(verbosity=0)
result = runner.run(suite)
print("Tests passed:", result.wasSuccessful())`,
            exercisePrompt: "Multiplication funksiyasini testlovchi TestKopaytirish klassini yozib, testlarni muvaffaqiyatli yakunlang (Natija: Tests passed: True).",
            testCases: [{ input: "", expectedOutput: "Tests passed: True" }]
          }
        ]
      }
    ]
  }
];

export const practiceChallenges: Challenge[] = [
  {
    id: "ch_1",
    title: "Array yorug'ligi: Teskari Matn",
    difficulty: Difficulty.BEGINNER,
    points: 15,
    description: "Berilgan satrni (string) teskari tartibda qaytaruvchi funksiya yozing. Masalan: `python` -> `nohtyp`",
    initialCode: `def teskari_string(matn):
    # Bu yerga kodingizni yozing
    return ""

print(teskari_string("python"))
print(teskari_string("ali"))`,
    solutionCode: `def teskari_string(matn):
    return matn[::-1]

print(teskari_string("python"))
print(teskari_string("ali"))`,
    testCases: [
      { input: "python", expectedOutput: "nohtyp" },
      { input: "ali", expectedOutput: "ila" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_2",
    title: "Tub sonni aniqlash",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Foydalanuvchi bergan butun son `prime (tub)` bo'lsa `True`, aks holda `False` qaytaruvchi funksiyani tuzing.",
    initialCode: `def tub_anim(son):
    # Kodingizni shu yerga kiriting
    if son < 2:
        return False
    return True

print(tub_anim(7))
print(tub_anim(12))`,
    solutionCode: `def tub_anim(son):
    if son < 2:
        return False
    for i in range(2, int(son**0.5) + 1):
      if son % i == 0:
         return False
    return True

print(tub_anim(7))
print(tub_anim(12))`,
    testCases: [
      { input: "7", expectedOutput: "True" },
      { input: "12", expectedOutput: "False" }
    ],
    category: "Matematika & Algoritmlar"
  },
  {
    id: "ch_3",
    title: "Fibonachchi soni (Recursion)",
    difficulty: Difficulty.ADVANCED,
    points: 50,
    description: "N-raqamdagi Fibonachchi sonini hisoblovchi rekursiv yoki optimal iterativ funksiya yarating (0, 1, 1, 2, 3, 5, 8...). Masalan: n = 6 bo'lganda 8 qaytarishi kerak (index 0 dan boshlanadi).",
    initialCode: `def fibonachchi(n):
    # Rekursiya yoki tsikl yordamida yozing
    return 0

print(fibonachchi(6))
print(fibonachchi(10))`,
    solutionCode: `def fibonachchi(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fibonachchi(6))
print(fibonachchi(10))`,
    testCases: [
      { input: "6", expectedOutput: "8" },
      { input: "10", expectedOutput: "55" }
    ],
    category: "Algoritmlar"
  },
  {
    id: "ch_4",
    title: "Sonlar massivi yig'indisi",
    difficulty: Difficulty.BEGINNER,
    points: 15,
    description: "Berilgan butun sonlar ro'yxatidagi barcha elementlar yig'indisini hisoblaydigan `elementlar_yigindisi(sonlar)` funksiyasini yozing.",
    initialCode: `def elementlar_yigindisi(sonlar):
    # Kodingizni shu yerga yozing
    return 0

print(elementlar_yigindisi([1, 2, 3, 4, 5]))
print(elementlar_yigindisi([10, -5, 20]))`,
    solutionCode: `def elementlar_yigindisi(sonlar):
    total = 0
    for son in sonlar:
        total += son
    return total

print(elementlar_yigindisi([1, 2, 3, 4, 5]))
print(elementlar_yigindisi([10, -5, 20]))`,
    testCases: [
      { input: "", expectedOutput: "15" },
      { input: "", expectedOutput: "25" }
    ],
    category: "Ro'yxat (List)"
  },
  {
    id: "ch_5",
    title: "Katta va kichik harflar",
    difficulty: Difficulty.BEGINNER,
    points: 15,
    description: "Matndagi barcha harflarni katta harfga o'tkazib beruvchi `katta_harf(matn)` funksiyasini yozing.",
    initialCode: `def katta_harf(matn):
    # Kod yozing
    return ""

print(katta_harf("salom python"))
print(katta_harf("pyschool 2026"))`,
    solutionCode: `def katta_harf(matn):
    return matn.upper()

print(katta_harf("salom python"))
print(katta_harf("pyschool 2026"))`,
    testCases: [
      { input: "", expectedOutput: "SALOM PYTHON" },
      { input: "", expectedOutput: "PYSCHOOL 2026" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_6",
    title: "Juft sonlarni saralash",
    difficulty: Difficulty.BEGINNER,
    points: 15,
    description: "Berilgan sonlar ro'yxatidan faqat juft sonlarni ajratib, yangi ro'yxat qaytaradigan `juft_sonlar(royxat)` funksiyasini yozing.",
    initialCode: `def juft_sonlar(royxat):
    # Kod yozing
    return []

print(juft_sonlar([1, 2, 3, 4, 5, 6]))
print(juft_sonlar([11, 13, 14, 18, 20]))`,
    solutionCode: `def juft_sonlar(royxat):
    return [son for son in royxat if son % 2 == 0]

print(juft_sonlar([1, 2, 3, 4, 5, 6]))
print(juft_sonlar([11, 13, 14, 18, 20]))`,
    testCases: [
      { input: "", expectedOutput: "[2, 4, 6]" },
      { input: "", expectedOutput: "[14, 18, 20]" }
    ],
    category: "Ro'yxat (List)"
  },
  {
    id: "ch_7",
    title: "Unli harflar sonini aniqlash",
    difficulty: Difficulty.BEGINNER,
    points: 20,
    description: "Matn ichidagi ingliz tili unli harflari (a, e, i, o, u) sonini hisoblovchi `unlilar_soni(matn)` funksiyasini yozing.",
    initialCode: `def unlilar_soni(matn):
    # Kod yozing
    return 0

print(unlilar_soni("Python dasturlash tili"))
print(unlilar_soni("Hello World!"))`,
    solutionCode: `def unlilar_soni(matn):
    count = 0
    unlilar = "aeiouAEIOU"
    for harf in matn:
        if harf in unlilar:
            count += 1
    return count

print(unlilar_soni("Python dasturlash tili"))
print(unlilar_soni("Hello World!"))`,
    testCases: [
      { input: "", expectedOutput: "6" },
      { input: "", expectedOutput: "3" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_8",
    title: "Kabisa yilini topish",
    difficulty: Difficulty.BEGINNER,
    points: 20,
    description: "Berilgan yil kabisa yili (leap year) ekanini tekshiruvchi `kabisa_yilmi(yil)` funksiyasini yozing. Kabisa yili 4 ga qoldiqsiz bo'linadi, lekin 100 ga bo'linsa, u faqat 400 ga bo'lingandagina kabisa hisoblanadi.",
    initialCode: `def kabisa_yilmi(yil):
    # Kod yozing
    return False

print(kabisa_yilmi(2020))
print(kabisa_yilmi(1900))
print(kabisa_yilmi(2000))`,
    solutionCode: `def kabisa_yilmi(yil):
    if yil % 400 == 0:
        return True
    if yil % 100 == 0:
        return False
    return yil % 4 == 0

print(kabisa_yilmi(2020))
print(kabisa_yilmi(1900))
print(kabisa_yilmi(2000))`,
    testCases: [
      { input: "", expectedOutput: "True" },
      { input: "", expectedOutput: "False" }
    ],
    category: "Mantiqiy amallar"
  },
  {
    id: "ch_9",
    title: "Eng katta elementni topish",
    difficulty: Difficulty.BEGINNER,
    points: 20,
    description: "Ro'yxat ichidagi eng katta sonni qaytaruvchi `eng_katta_element(sonlar)` funksiyasini yozing. Pythonning tayyor `max()` funksiyasidan foydalanmang.",
    initialCode: `def eng_katta_element(sonlar):
    # Kod yozing
    return 0

print(eng_katta_element([3, 7, 2, 9, 5]))
print(eng_katta_element([-10, -5, -2, -15]))`,
    solutionCode: `def eng_katta_element(sonlar):
    if not sonlar:
        return None
    eng_katta = sonlar[0]
    for son in sonlar:
        if son > eng_katta:
            eng_katta = son
    return eng_katta

print(eng_katta_element([3, 7, 2, 9, 5]))
print(eng_katta_element([-10, -5, -2, -15]))`,
    testCases: [
      { input: "", expectedOutput: "9" },
      { input: "", expectedOutput: "-2" }
    ],
    category: "Ro'yxat (List)"
  },
  {
    id: "ch_10",
    title: "Eng uzun so'zni aniqlash",
    difficulty: Difficulty.BEGINNER,
    points: 20,
    description: "Berilgan matn ichidagi eng uzun so'zni qaytaradigan `eng_uzun_soz(matn)` funksiyasini yozing.",
    initialCode: `def eng_uzun_soz(matn):
    # Kod yozing
    return ""

print(eng_uzun_soz("Python dasturlash tili juda qiziqarli"))
print(eng_uzun_soz("Salom olam"))`,
    solutionCode: `def eng_uzun_soz(matn):
    sozlar = matn.split()
    if not sozlar:
        return ""
    eng_uzun = sozlar[0]
    for soz in sozlar:
        if len(soz) > len(eng_uzun):
            eng_uzun = soz
    return eng_uzun

print(eng_uzun_soz("Python dasturlash tili juda qiziqarli"))
print(eng_uzun_soz("Salom olam"))`,
    testCases: [
      { input: "", expectedOutput: "dasturlash" },
      { input: "", expectedOutput: "Salom" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_11",
    title: "Kvadratlar ro'yxati",
    difficulty: Difficulty.BEGINNER,
    points: 20,
    description: "1 dan N gacha bo'lgan barcha butun sonlarning kvadratlaridan iborat ro'yxatni qaytaruvchi `kvadratlar(n)` funksiyasini yarating.",
    initialCode: `def kvadratlar(n):
    # Kod yozing
    return []

print(kvadratlar(4))
print(kvadratlar(5))`,
    solutionCode: `def kvadratlar(n):
    return [i**2 for i in range(1, n + 1)]

print(kvadratlar(4))
print(kvadratlar(5))`,
    testCases: [
      { input: "", expectedOutput: "[1, 4, 9, 16]" },
      { input: "", expectedOutput: "[1, 4, 9, 16, 25]" }
    ],
    category: "Matematika"
  },
  {
    id: "ch_12",
    title: "Palindrom so'zlar",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Matn oldindan ham, orqadan ham bir xil o'qilsa, u palindrom hisoblanadi. Berilgan matn palindrom ekanini tekshiruvchi `palindrommi(matn)` funksiyasini yozing.",
    initialCode: `def palindrommi(matn):
    # Kod yozing
    return False

print(palindrommi("Aziza"))
print(palindrommi("Python"))`,
    solutionCode: `def palindrommi(matn):
    normalized = matn.lower()
    return normalized == normalized[::-1]

print(palindrommi("Aziza"))
print(palindrommi("Python"))`,
    testCases: [
      { input: "", expectedOutput: "True" },
      { input: "", expectedOutput: "False" }
    ],
    category: "Mantiqiy amallar"
  },
  {
    id: "ch_13",
    title: "Elementlar chastotasini hisoblash",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Ro'yxatdagi har bir element necha marta qatnashganini hisoblab, lug'at (dictionary) formatida qaytaruvchi `elementlar_chastotasi(royxat)` funksiyasini yozing.",
    initialCode: `def elementlar_chastotasi(royxat):
    # Kod yozing
    return {}

print(elementlar_chastotasi(['a', 'b', 'a', 'c', 'b', 'a']))`,
    solutionCode: `def elementlar_chastotasi(royxat):
    chastota = {}
    for element in royxat:
        chastota[element] = chastota.get(element, 0) + 1
    return chastota

print(elementlar_chastotasi(['a', 'b', 'a', 'c', 'b', 'a']))`,
    testCases: [
      { input: "", expectedOutput: "{'a': 3, 'b': 2, 'c': 1}" }
    ],
    category: "Lug'atlar (Dict)"
  },
  {
    id: "ch_14",
    title: "Anagramlar tekshiruvi",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Ikki matn anagrammi ekanligini (bir xil harflarning turli tartibda kelishi) tekshiruvchi `anagrammi(matn1, matn2)` funksiyasini yozing.",
    initialCode: `def anagrammi(matn1, matn2):
    # Kod yozing
    return False

print(anagrammi("tok", "kot"))
print(anagrammi("olma", "anor"))`,
    solutionCode: `def anagrammi(matn1, matn2):
    return sorted(matn1.lower()) == sorted(matn2.lower())

print(anagrammi("tok", "kot"))
print(anagrammi("olma", "anor"))`,
    testCases: [
      { input: "", expectedOutput: "True" },
      { input: "", expectedOutput: "False" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_15",
    title: "Nusxasiz elementlar ro'yxati",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Ro'yxat ichidagi takrorlanuvchi elementlarni olib tashlab, faqat yagona elementlardan tashkil topgan tartiblangan yangi ro'yxat qaytaradigan `nusxasiz_royxat(royxat)` funksiyasini yozing.",
    initialCode: `def nusxasiz_royxat(royxat):
    # Kod yozing
    return []

print(nusxasiz_royxat([3, 1, 2, 3, 2, 4, 1]))
print(nusxasiz_royxat(['olma', 'anor', 'olma', 'gilos']))`,
    solutionCode: `def nusxasiz_royxat(royxat):
    return sorted(list(set(royxat)))

print(nusxasiz_royxat([3, 1, 2, 3, 2, 4, 1]))
print(nusxasiz_royxat(['olma', 'anor', 'olma', 'gilos']))`,
    testCases: [
      { input: "", expectedOutput: "[1, 2, 3, 4]" },
      { input: "", expectedOutput: "['anor', 'gilos', 'olma']" }
    ],
    category: "Ro'yxat (List)"
  },
  {
    id: "ch_16",
    title: "O'nlikdan ikkilik sanoq tizimiga",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Berilgan musbat o'nlik (decimal) sonini ikkilik (binary) sanoq tizimidagi ko'rinishini satr (string) sifatida qaytaruvchi `onlikdan_ikkilikka(n)` funksiyasini yozing.",
    initialCode: `def onlikdan_ikkilikka(n):
    # Kod yozing
    return ""

print(onlikdan_ikkilikka(10))
print(onlikdan_ikkilikka(15))`,
    solutionCode: `def onlikdan_ikkilikka(n):
    return bin(n)[2:]

print(onlikdan_ikkilikka(10))
print(onlikdan_ikkilikka(15))`,
    testCases: [
      { input: "", expectedOutput: "1010" },
      { input: "", expectedOutput: "1111" }
    ],
    category: "Matematika"
  },
  {
    id: "ch_17",
    title: "Gapdagi so'zlarni teskarilash",
    difficulty: Difficulty.INTERMEDIATE,
    points: 30,
    description: "Berilgan gapdagi so'zlarning joylashish tartibini teskari holatga o'giring. Masalan: 'Salom barcha dasturchilarga' -> 'dasturchilarga barcha Salom'.",
    initialCode: `def sozlar_teskarisi(gap):
    # Kod yozing
    return ""

print(sozlar_teskarisi("Salom barcha dasturchilarga"))
print(sozlar_teskarisi("Keling Python o'rganamiz"))`,
    solutionCode: `def sozlar_teskarisi(gap):
    sozlar = gap.split()
    return " ".join(sozlar[::-1])

print(sozlar_teskarisi("Salom barcha dasturchilarga"))
print(sozlar_teskarisi("Keling Python o'rganamiz"))`,
    testCases: [
      { input: "", expectedOutput: "dasturchilarga barcha salom" },
      { input: "", expectedOutput: "o'rganamiz python keling" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_18",
    title: "Ikkinchi eng katta son",
    difficulty: Difficulty.INTERMEDIATE,
    points: 35,
    description: "Ro'yxat ichidagi ikkinchi eng katta elementni aniqlovchi `ikkinchi_katta(sonlar)` funksiyasini yozing.",
    initialCode: `def ikkinchi_katta(sonlar):
    # Kod yozing
    return 0

print(ikkinchi_katta([10, 20, 20, 15, 18]))
print(ikkinchi_katta([5, 5, 2, 1, 4]))`,
    solutionCode: `def ikkinchi_katta(sonlar):
    nusxasiz = list(set(sonlar))
    if len(nusxasiz) < 2:
        return None
    nusxasiz.sort()
    return nusxasiz[-2]

print(ikkinchi_katta([10, 20, 20, 15, 18]))
print(ikkinchi_katta([5, 5, 2, 1, 4]))`,
    testCases: [
      { input: "", expectedOutput: "18" },
      { input: "", expectedOutput: "4" }
    ],
    category: "Ro'yxat (List)"
  },
  {
    id: "ch_19",
    title: "Matndagi raqamlar yig'indisi",
    difficulty: Difficulty.INTERMEDIATE,
    points: 35,
    description: "Matn tarkibidagi barcha raqamlarni aniqlab, ularning butun son yig'indisini hisoblovchi `raqamlar_yigindisi(matn)` funksiyasini yozing.",
    initialCode: `def raqamlar_yigindisi(matn):
    # Kod yozing
    return 0

print(raqamlar_yigindisi("Aziz 25 yoshda, uning do'sti 26 da"))
print(raqamlar_yigindisi("Python uch yuz besh"))`,
    solutionCode: `def raqamlar_yigindisi(matn):
    total = 0
    for belgi in matn:
        if belgi.isdigit():
            total += int(belgi)
    return total

print(raqamlar_yigindisi("Aziz 25 yoshda, uning do'sti 26 da"))
print(raqamlar_yigindisi("Python uch yuz besh"))`,
    testCases: [
      { input: "", expectedOutput: "15" },
      { input: "", expectedOutput: "0" }
    ],
    category: "Satrlar bilan ishlash"
  },
  {
    id: "ch_20",
    title: "Ikkilik qidiruv (Binary Search)",
    difficulty: Difficulty.ADVANCED,
    points: 50,
    description: "Tartiblangan ro'yxat va maqsadli qiymat (target) berilgan. Ikkilik qidiruv (binary search) algoritmidan foydalanib, maqsadli qiymatning ro'yxatdagi indeksini aniqlovchi va O(log n) tezlikda ishlovchi `binary_search(royxat, target)` funksiyasini yozing. Topilmasa -1 qaytaring.",
    initialCode: `def binary_search(royxat, target):
    # Kod yozing
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 9))
print(binary_search([1, 3, 5, 7, 9, 11], 4))`,
    solutionCode: `def binary_search(royxat, target):
    chap, ong = 0, len(royxat) - 1
    while chap <= ong:
        orta = (chap + ong) // 2
        if royxat[orta] == target:
            return orta
        elif royxat[orta] < target:
            chap = orta + 1
        else:
            ong = orta - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 9))
print(binary_search([1, 3, 5, 7, 9, 11], 4))`,
    testCases: [
      { input: "", expectedOutput: "4" },
      { input: "", expectedOutput: "-1" }
    ],
    category: "Algoritmlar"
  },
  {
    id: "ch_21",
    title: "EKUB (Evklid Algoritmi)",
    difficulty: Difficulty.ADVANCED,
    points: 50,
    description: "Ikki musbat butun sonning Eng Katta Umumiy Bo'luvchisini (EKUB/GCD) Evklid algoritmi yoki rekursiya yordamida hisoblovchi `ekub(a, b)` funksiyasini yozing.",
    initialCode: `def ekub(a, b):
    # Kod yozing
    return 1

print(ekub(48, 18))
print(ekub(101, 10))`,
    solutionCode: `def ekub(a, b):
    while b:
        a, b = b, a % b
    return a

print(ekub(48, 18))
print(ekub(101, 10))`,
    testCases: [
      { input: "", expectedOutput: "6" },
      { input: "", expectedOutput: "1" }
    ],
    category: "Matematika & Algoritmlar"
  },
  {
    id: "ch_22",
    title: "Balanslashgan qavslar",
    difficulty: Difficulty.ADVANCED,
    points: 50,
    description: "Faqat '(', ')', '{', '}', '[', ']' qavslaridan iborat matn berilgan. Qavslar to'g'ri ochilib, mos tartibda yopilganligini (balanslanganligini) tekshiruvchi `qavslar_balansi(matn)` funksiyasini yozing.",
    initialCode: `def qavslar_balansi(matn):
    # Stack (ro'yxat) yordamida yozing
    return False

print(qavslar_balansi("{[()]}"))
print(qavslar_balansi("{[(])}"))`,
    solutionCode: `def qavslar_balansi(matn):
    stack = []
    mos_qavslar = {')': '(', '}': '{', ']': '['}
    for belgi in matn:
        if belgi in mos_qavslar.values():
            stack.append(belgi)
        elif belgi in mos_qavslar.keys():
            if not stack or stack.pop() != mos_qavslar[belgi]:
                return False
    return len(stack) == 0

print(qavslar_balansi("{[()]}"))
print(qavslar_balansi("{[(])}"))`,
    testCases: [
      { input: "", expectedOutput: "True" },
      { input: "", expectedOutput: "False" }
    ],
    category: "Algoritmlar"
  },
  {
    id: "ch_23",
    title: "Rim raqamlari konvertori",
    difficulty: Difficulty.ADVANCED,
    points: 50,
    description: "Berilgan Rim raqamini (masalan: 'IX', 'XIV', 'MCMXCVI') butun son (integer) ko'rinishiga o'tkazuvchi `rim_soni(rim_matni)` funksiyasini yozing.",
    initialCode: `def rim_soni(rim_matni):
    # Lug'at va mantiq yordamida hisoblang
    return 0

print(rim_soni("XIV"))
print(rim_soni("MCMXCVI"))`,
    solutionCode: `def rim_soni(rim_matni):
    rim_qiymatlari = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    jami = 0
    oldingi_qiymat = 0
    for harf in reversed(rim_matni):
        qiymat = rim_qiymatlari.get(harf, 0)
        if qiymat < oldingi_qiymat:
            jami -= qiymat
        else:
            jami += qiymat
        oldingi_qiymat = qiymat
    return jami

print(rim_soni("XIV"))
print(rim_soni("MCMXCVI"))`,
    testCases: [
      { input: "", expectedOutput: "14" },
      { input: "", expectedOutput: "1996" }
    ],
    category: "Mantiqiy amallar"
  }
];

export const quizQuestions: { [moduleId: string]: QuizQuestion[] } = {
  "m1": [
    {
      id: "q1_1",
      question: "Pythonda ekranga ma'lumot chiqarish uchun qaysi funksiyadan foydalaniladi?",
      options: ["echo()", "console.log()", "print()", "system.out.println()"],
      correctIndex: 2,
      explanation: "Pythonda standart konsol/ekranga ma'lumot yozish uchun 'print()' ishlatiladi."
    },
    {
      id: "q1_2",
      question: "Python tilining asoschisi kim?",
      options: ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"],
      correctIndex: 0,
      explanation: "Python tili 1989-yil oxirida niderlandiyalik dasturchi Guido van Rossum tomonidan yaratilgan."
    },
    {
      id: "q1_3",
      question: "Qaysi ma'lumot turi o'zgaruvchan emas (immutable) va tartiblangan hisoblanadi?",
      options: ["List (Ro'yxat)", "Tuple (Kortej)", "Set (To'plam)", "Dictionary (Lug'at)"],
      correctIndex: 1,
      explanation: "Kortej (Tuple) elementlari o'zgartirilmaydi (immutable) va ular tartiblangan bo'ladi."
    }
  ],
  "m2": [
    {
      id: "q2_1",
      question: "Python-da shart bloklari qanday ajratiladi?",
      options: ["Gullik qavslar {} orqali", "Keywords orqali", "Indentatsiya (to'rt marta bo'sh joy) orqali", "Nuqtali vergul bilan"],
      correctIndex: 2,
      explanation: "Pythonda bloklarni guruhlash uchun faqat xatboshi (indentation) ishlatiladi."
    },
    {
      id: "q2_2",
      question: "Fayl oxiriga yangi ma'lumotlarni qo'shish (append) uchun open() funksiyasining qaysi rejimidan (mode) foydalaniladi?",
      options: ["'r'", "'w'", "'a'", "'x'"],
      correctIndex: 2,
      explanation: "'a' (append) rejimi fayl oxiriga ma'lumot qo'shish uchun ishlatiladi."
    },
    {
      id: "q2_3",
      question: "datetime modulida ikki sana orasidagi farqni (davomiylikni) ifodalash uchun qaysi klass ishlatiladi?",
      options: ["date", "time", "timedelta", "timezone"],
      correctIndex: 2,
      explanation: "timedelta klassi ikki sana yoki vaqt orasidagi farqni (davomiylikni) ifodalaydi."
    }
  ],
  "m3": [
    {
      id: "q3_1",
      question: "Klass ichidagi metodning birinchi argumenti har doim nima deb nomlanadi?",
      options: ["this", "parent", "self", "object"],
      correctIndex: 2,
      explanation: "Python an'anasiga ko'ra klass ichidagi metodlar birinchi argument sifatida hamisha 'self'ni oladi."
    },
    {
      id: "q3_2",
      question: "Klass o'zgaruvchisini private (xususiy, tashqi kirish cheklangan) qilish uchun uning nomidan oldin nima qo'yiladi?",
      options: ["Bitta pastki chiziq '_'", "Ikkita pastki chiziq '__'", "Dollar belgisi '$'", "Private kalit so'zi"],
      correctIndex: 1,
      explanation: "Pythonda klass o'zgaruvchisining nomiga ikkita pastki chiziq (double underscore) qo'shilsa, u private bo'ladi."
    },
    {
      id: "q3_3",
      question: "Obyektni chop etganda (print) yoki str() ga o'girganda ishlaydigan maxsus (dunder) metod qaysi?",
      options: ["__init__", "__len__", "__str__", "__repr__"],
      correctIndex: 2,
      explanation: "__str__ metodi obyekt chop etilganda uning satrli ko'rinishini qaytaradi."
    }
  ],
  "m6": [
    {
      id: "q6_1",
      question: "Asinxron funksiyani (coroutine) e'lon qilish va chaqirishda qaysi kalit so'zlardan foydalaniladi?",
      options: ["def / call", "async def / await", "promise / then", "thread / run"],
      correctIndex: 1,
      explanation: "Pythonda asinxron funksiyalar 'async def' bilan e'lon qilinadi va ularni kutish uchun 'await' ishlatiladi."
    },
    {
      id: "q6_2",
      question: "Python-da Global Interpreter Lock (GIL) nima uchun xizmat qiladi?",
      options: [
        "Xavfsizlik maqsadida dasturlarni shifrlaydi",
        "Bir vaqtda faqat bitta oqim Python baytkodini ishga tushirishini ta'minlaydi",
        "O'zgaruvchilar xotirasini avtomat tozalaydi",
        "Klasslar sonini cheklaydi"
      ],
      correctIndex: 1,
      explanation: "GIL bir vaqtning o'zida faqat bitta oqim Python baytkodini boshqarishini kafolatlaydi, bu esa ko'p yadroli tizimlarda multithreading samaradorligini cheklaydi."
    }
  ],
  "m7": [
    {
      id: "q7_1",
      question: "Serverdan ma'lumot olish uchun HTTP-ning qaysi so'rov turidan (method) foydalaniladi?",
      options: ["GET", "POST", "DELETE", "PUT"],
      correctIndex: 0,
      explanation: "HTTP GET so'rovi serverdan ma'lumotlarni so'rash va yuklab olish uchun ishlatiladi."
    },
    {
      id: "q7_2",
      question: "HTML matn tarkibidagi teglarni parse qilish va ma'lumot ajratish nima deb ataladi?",
      options: ["Web Scraping", "Data Serialization", "Recursion", "Multithreading"],
      correctIndex: 0,
      explanation: "Veb-sahifalardan ma'lumotlarni dasturiy yig'ish va tozalash jarayoni Web Scraping deb ataladi."
    }
  ],
  "m8": [
    {
      id: "q8_1",
      question: "NumPy kutubxonasining oddiy Python list'laridan asosiy ustunligi nimada?",
      options: [
        "Ular ko'proq xotira egallaydi",
        "Vektorli hisob-kitoblar (C-backend) tufayli ancha tez ishlaydi",
        "Faqat matn saqlay oladi",
        "Hech qanday farqi yo'q"
      ],
      correctIndex: 1,
      explanation: "NumPy massivlari xotirada ketma-ket joylashgani va vektorlashtirilgani tufayli oddiy listlardan ancha tez ishlaydi."
    },
    {
      id: "q8_2",
      question: "Pandas kutubxonasida ikki o'lchovli jadval shaklidagi asosiy tuzilma nima deb ataladi?",
      options: ["Series", "DataFrame", "Matrix", "List"],
      correctIndex: 1,
      explanation: "Pandas-da ikki o'lchovli ustun va satrlardan iborat jadval strukturasi 'DataFrame' deyiladi."
    }
  ],
  "m9": [
    {
      id: "q9_1",
      question: "Dasturni unit testlash uchun ishlatiladigan Python-ning built-in kutubxonasi qaysi?",
      options: ["unittest", "pytest", "json", "math"],
      correctIndex: 0,
      explanation: "Python-ning standart kutubxonasi tarkibidagi 'unittest' moduli unit testlar yozish uchun maxsus xizmat qiladi."
    }
  ]
};
export const interviewQuestions: InterviewQuestion[] = [
  // ==================== BASICS (1 - 50) ====================
  {
    id: "int_1",
    question: "List va Tuple orasidagi asosiy farqlar nimada?",
    category: "Basics",
    answer: "List o'zgaruvchan (mutable) bo'lib, unga element qo'shish va o'chirish mumkin. Tuple esa o'zgarmas (immutable) bo'lib, yaratilgandan so'ng tarkibini o'zgartirib bo'lmaydi. Xotirada Tuple kamroq joy egallaydi va tezroq ishlaydi, shuningdek lug'at kaliti bo'lishi mumkin.",
    codeExample: `lst = [1, 2, 3]
tpl = (1, 2, 3)`
  },
  {
    id: "int_2",
    question: "is va == operatorlari orasidagi farq nima?",
    category: "Basics",
    answer: "== operatori ikkita obyektning qiymatlari tengligini tekshiradi (equality). is operatori esa ularning xotiradagi manzili bir xilligini, ya'ni aynan bitta obyekt ekanligini tekshiradi (identity).",
    codeExample: `a = [1, 2]
b = [1, 2]
print(a == b)  # True
print(a is b)  # False`
  },
  {
    id: "int_3",
    question: "*args va **kwargs nima va ular qanday farqlanadi?",
    category: "Basics",
    answer: "*args funksiyaga cheksiz miqdordagi pozitsion argumentlarni uzatadi va ular Tuple bo'lib keladi. **kwargs esa cheksiz miqdordagi kalit-qiymat (nomlangan) argumentlarni yuboradi va ular Dictionary bo'lib keladi.",
    codeExample: `def func(*args, **kwargs):
    print(args)    # Tuple
    print(kwargs)  # Dict`
  },
  {
    id: "int_4",
    question: "Python'da Generatorlar nima va yield qanday vazifani bajaradi?",
    category: "Basics",
    answer: "Generatorlar barcha qiymatlarni birdaniga xotiraga yuklamasdan, so'rov bo'yicha elementma-element yields qiladigan funksiyalardir. yield kalit so'zi funksiya holatini saqlab qolib navbatdagi elementni qaytaradi.",
    codeExample: `def gen():
    yield 1
    yield 2`
  },
  {
    id: "int_5",
    question: "List Comprehension va Generator Expression farqi nimada?",
    category: "Basics",
    answer: "List Comprehension [] qavslar ichida yozilib, natijani darhol to'liq ro'yxat shaklida xotiraga yuklaydi. Generator Expression () qavslar ichida yozilib, lazy iterator qaytaradi va xotirani tejaydi.",
    codeExample: `lst = [x for x in range(100)] # List
gn = (x for x in range(100))  # Generator`
  },
  {
    id: "int_6",
    question: "Python'da qanday obyektlar lug'at kaliti (dict key) bo'la oladi?",
    category: "Basics",
    answer: "Faqatgina o'zgarmas (immutable) va hashlanadigan (hashable) obyektlar (sonlar, str, tuple, frozenset) kalit bo'lishi mumkin. List va dict kabi o'zgaruvchan tuzilmalar xatolikka olib keladi.",
    codeExample: `d = {(1, 2): "Tuple kalit"}  # To'g'ri
# d = {[1, 2]: "Xato"}        # TypeError`
  },
  {
    id: "int_7",
    question: "Funksiya default argumentiga mutable obyekt yozish xavfi nimada?",
    category: "Basics",
    answer: "Default argumentlar funksiya yuklangan vaqtda faqat bir marta yaratiladi. Agar mutable obyekt yozilsa, funksiya har safar chaqirilganda o'sha bitta obyektni o'zgartiradi va ma'lumotlar chalkashib ketadi.",
    codeExample: `def add(val, lst=[]):
    lst.append(val)
    return lst`
  },
  {
    id: "int_8",
    question: "Lambda funksiyalar nima va ularning qanday cheklovlari bor?",
    category: "Basics",
    answer: "Lambda - bu anonim, nomsiz bir qatorli funksiyalar bo'lib, faqat bitta ifodani qaytarishi mumkin. Ularning ichida shartli bloklar yoki ko'p qatorli sikllarni yozib bo'lmasligi kerak.",
    codeExample: `kvadrat = lambda x: x ** 2`
  },
  {
    id: "int_9",
    question: "Context Manager nima va with operatori qanday ishlaydi?",
    category: "Basics",
    answer: "Context Manager resurslarni (fayllar, tarmoqlar) ochish va xavfsiz yopish uchun andozadir. with operatori kirishda __enter__ va chiqishda (hatto xatolik yuz berganda ham) __exit__ metodlarini ishga tushiradi.",
    codeExample: `with open("file.txt", "w") as f:
    f.write("Salom")`
  },
  {
    id: "int_10",
    question: "LEGB qoidasi bo'yicha o'zgaruvchilar scope qidiruvi qanday tartibda bo'ladi?",
    category: "Basics",
    answer: "Python o'zgaruvchini quyidagi ketma-ketlikda qidiradi: Local (funksiya ichi), Enclosing (tashqi funksiya ichi), Global (modul darajasi), va Built-in (ichki Python funksiyalari - len, print).",
  },
  {
    id: "int_11",
    question: "try-except tarkibidagi else va finally qachon ishlaydi?",
    category: "Basics",
    answer: "except xatolik yuz berganda ishlaydi. else bloki faqat try ichida hech qanday xatolik yuz bermaganda ishlaydi. finally esa xatolik yuz berish yoki bermasligidan qat'iy nazar hamisha ishlaydi.",
    codeExample: `try:
    x = 1
except:
    print("Xato")
else:
    print("Xato yo'q")
finally:
    print("Doim")`
  },
  {
    id: "int_12",
    question: "Short-circuit evaluation (mantiqiy qisqa tutashuv) nima?",
    category: "Basics",
    answer: "Mantiqiy and va or operatorlarida natija chap tomondagi ifodadanoq ma'lum bo'lsa, o'ng tomondagi ifoda hisoblanmaydi. Masalan, True or func() bo'lsa, func() ishga tushmaydi.",
  },
  {
    id: "int_13",
    question: "Python rekursiya limiti nima va uni qanday ko'rish va o'zgartirish mumkin?",
    category: "Basics",
    answer: "Python stack to'lib ketishini oldini olish uchun rekursiya limitini qo'yadi (default 1000). Uni sys.getrecursionlimit() orqali ko'rish va sys.setrecursionlimit() orqali o'zgartirish mumkin.",
    codeExample: `import sys
sys.setrecursionlimit(2000)`
  },
  {
    id: "int_14",
    question: "range() va Python 2 dagi xrange() farqi nimada?",
    category: "Basics",
    answer: "Python 2 da range() butun ro'yxatni (list) xotiraga yuklagan, xrange() esa generator kabi yields qilgan. Python 3 da esa range() avtomatik ravishda xrange kabi lazy sequence obyektidir.",
  },
  {
    id: "int_15",
    question: "Set nima va qanday tartibda elementlarni saqlaydi?",
    category: "Basics",
    answer: "Set - bu unikal (takrorlanmas) elementlarni saqlovchi, tartiblanmagan (unordered) to'plamdir. U xotirada hash-jadval asosida ishlaydi, shuning uchun element borligini tekshirish O(1) vaqt oladi.",
    codeExample: `s = {1, 2, 2, 3}  # {1, 2, 3}`
  },
  {
    id: "int_16",
    question: "map(), filter() va reduce() nima?",
    category: "Basics",
    answer: "map(f, seq) ro'yxat elementlariga f funksiyani qo'llaydi. filter(f, seq) f True qaytargan elementlarni saralaydi. reduce(f, seq) esa elementlarni ketma-ket bitta qiymatga yig'adi (functools modulida).",
    codeExample: `from functools import reduce
r = reduce(lambda a, b: a+b, [1, 2, 3])  # 6`
  },
  {
    id: "int_17",
    question: "String immutability (o'zgarmaslik) nima va nima uchun kerak?",
    category: "Basics",
    answer: "Python-da satr (string) yaratilgandan so'ng o'zgartirilmaydi. Bu xavfsizlik, xotirani string interning (keshlash) yordamida tejash va lug'atlarda ishonchli kalit (hash) bo'lishini ta'minlash uchun xizmat qiladi.",
  },
  {
    id: "int_18",
    question: "F-strings, format() va %-formatting farqlari nimada?",
    category: "Basics",
    answer: "%-formatting eski uslub. format() moslashuvchan, f-strings esa eng zamonaviy, tushunarli va tezkor formatlash usulidir, chunki u runtime-da to'g'ridan-to'g'ri baholanadi.",
    codeExample: `x = "Python"
print(f"Salom {x}")`
  },
  {
    id: "int_19",
    question: "zip() va enumerate() funksiyalari qanday vazifani bajaradi?",
    category: "Basics",
    answer: "zip() bir nechta ketma-ketliklarni parallel ravishda juftlik (tuple) qilib birlashtiradi. enumerate() esa ketma-ketlik elementlarini indekslari bilan birga juftlik qilib qaytaradi.",
    codeExample: `for i, v in enumerate(["a", "b"]):
    print(i, v)`
  },
  {
    id: "int_20",
    question: "dir() va help() funksiyalari orasidagi farq nimada?",
    category: "Basics",
    answer: "dir() obyektning barcha atributlari, metodlari va dunder metodlari ro'yxatini qaytaradi. help() esa obyektning docstring va foydalanish qo'llanmasini to'liq ko'rsatib beradi.",
  },
  {
    id: "int_21",
    question: "Python byte-code nima va .pyc fayllari qanday hosil bo'ladi?",
    category: "Basics",
    answer: "Python interpretatsiya qilinadigan til bo'lsa ham, ijro etishdan oldin kodni byte-code ga (.pyc fayllariga) o'tkazadi. Bu keyingi safar kodni tezroq yuklash uchun virtual mashina tushunadigan past darajali buyruqlardir.",
  },
  {
    id: "int_22",
    question: "pass va Ellipsis (...) farqi nimada?",
    category: "Basics",
    answer: "Ikkalasi ham bo'sh tana (placeholder) sifatida ishlatilishi mumkin, lekin pass hech qanday qiymat qaytarmaydigan operator, Ellipsis (...) esa o'ziga xos singleton obyekt hisoblanib, ko'pincha slicing yoki type hinting-da ishlatiladi.",
  },
  {
    id: "int_23",
    question: "if __name__ == '__main__' bloki nima uchun yoziladi?",
    category: "Basics",
    answer: "Ushbu blok faqatgina fayl bevosita ishga tushirilganda (run) bajarilishini ta'minlaydi. Agar ushbu fayl boshqa modul tomonidan import qilinsa, bu blok ichidagi kod ishga tushmaydi.",
  },
  {
    id: "int_24",
    question: "Shallow copy va Deep copy farqi nimada?",
    category: "Basics",
    answer: "Shallow copy faqat tashqi konteyner nusxasini yaratadi, ichki elementlarga havolani saqlaydi. Deep copy esa barcha ichki va chuqur joylashgan elementlarning ham to'liq, mustaqil nusxasini yaratadi.",
    codeExample: `import copy
d = copy.deepcopy(lst)`
  },
  {
    id: "int_25",
    question: "break, continue va pass orasidagi farq nimada?",
    category: "Basics",
    answer: "break siklni butunlay to'xtatadi. continue siklning joriy qadamini o'tkazib yuborib, keyingisiga o'tadi. pass esa hech narsa qilmaydi, sintaksis bo'shliqni to'ldirish uchun ishlatiladi.",
  },
  {
    id: "int_26",
    question: "any() va all() funksiyalari qanday ishlaydi?",
    category: "Basics",
    answer: "any() ro'yxatdagi elementlardan kamida bittasi True bo'lsa True qaytaradi. all() esa ro'yxatdagi barcha elementlar True bo'lsagina True qaytaradi.",
    codeExample: `print(any([False, True]))  # True
print(all([True, True]))   # True`
  },
  {
    id: "int_27",
    question: "sorted() funksiyasi va list.sort() metodi farqi?",
    category: "Basics",
    answer: "list.sort() ro'yxatning o'zini joyida tartiblaydi (in-place) va None qaytaradi. sorted() esa asl ro'yxatga tegmasdan, tartiblangan yangi ro'yxat (list) qaytaradi.",
  },
  {
    id: "int_28",
    question: "global va nonlocal kalit so'zlari qachon ishlatiladi?",
    category: "Basics",
    answer: "global funksiya ichidan global (modul darajasidagi) o'zgaruvchini o'zgartirish uchun ishlatiladi. nonlocal esa ichma-ich funksiyalarda tashqi funksiyadagi o'zgaruvchini o'zgartirish uchun xizmat qiladi.",
    codeExample: `def outer():
    x = 1
    def inner():
        nonlocal x
        x = 2`
  },
  {
    id: "int_29",
    question: "Exception chaining (xatoliklarni zanjirlash) nima?",
    category: "Basics",
    answer: "Exception chaining bitta xatolik boshqa bir xatolikka sabab bo'lganini ko'rsatish uchun ishlatiladi. raise ... from ... sintaksisi orqali xatoliklar tarixi saqlab qolinadi.",
    codeExample: `raise KeyError("xato") from ValueError("sabab")`
  },
  {
    id: "int_30",
    question: "dict.get() va dict[] orqali qiymat olish farqi nimada?",
    category: "Basics",
    answer: "dict[] kalit topilmasa KeyError beradi. dict.get() esa kalit topilmasa default qiymatni (xatoliksiz, None yoki berilgan qiymatni) qaytaradi.",
    codeExample: `d = {}
print(d.get("key", "default"))`
  },
  {
    id: "int_31",
    question: "collections modulining Counter, defaultdict va OrderedDict klasslari nima?",
    category: "Basics",
    answer: "Counter elementlar sonini hisoblash uchun ishlatiladi. defaultdict mavjud bo'lmagan kalit so'ralganda avtomatik standart qiymat yaratadi. OrderedDict esa qo'shilgan elementlar tartibini saqlaydi.",
  },
  {
    id: "int_32",
    question: "Frozenset nima va u oddiy set dan qanday farq qiladi?",
    category: "Basics",
    answer: "Frozenset - o'zgarmas (immutable) set to'plamidir. Uni yaratgandan keyin o'zgartirib bo'lmaydi va u hashlanadigan bo'lgani uchun boshqa lug'atlarda kalit sifatida ishlatilishi mumkin.",
  },
  {
    id: "int_33",
    question: "Operator // va % orasidagi farq nimada?",
    category: "Basics",
    answer: "// operatori bo'lish natijasining faqat butun qismini (integer division) qaytaradi. % operatori esa bo'lishdan qolgan qoldiqni (modulo) qaytaradi.",
    codeExample: `print(7 // 3)  # 2
print(7 % 3)   # 1`
  },
  {
    id: "int_34",
    question: "next() va iter() funksiyalari qanday ishlaydi?",
    category: "Basics",
    answer: "iter() har qanday ketma-ketlik (iterable) obyektidan iterator oladi. next() esa ushbu iteratorning navbatdagi elementini qaytaradi va oxiriga yetsa StopIteration xatosini beradi.",
  },
  {
    id: "int_35",
    question: "Python dynamic typing (dinamik tiplash) nima?",
    category: "Basics",
    answer: "Python-da o'zgaruvchi yaratilayotganda uning turi (type) ko'rsatilmaydi, balki o'zgaruvchining turi unga yuklangan qiymatga qarab runtime-da (kod ishlayotgan vaqtda) aniqlanadi.",
  },
  {
    id: "int_36",
    question: "Python-da qanday qilib maxsus xatolik klassi (Custom Exception) yaratiladi?",
    category: "Basics",
    answer: "Custom Exception yaratish uchun Exception asosiy klassidan merosxo'r klass yaratiladi.",
    codeExample: `class MyError(Exception):
    pass`
  },
  {
    id: "int_37",
    question: "assert operatori nima va u nima uchun ishlatiladi?",
    category: "Basics",
    answer: "assert dasturdagi shartni tekshirish uchun ishlatiladi. Agar shart False bo'lsa, u AssertionError xatosini beradi. U odatda dasturni test qilish va debugging uchun qo'llaniladi.",
    codeExample: `assert 1 == 1`
  },
  {
    id: "int_38",
    question: "Rekursiya (Recursion) va Iteratsiya (Iteration) farqi nimada?",
    category: "Basics",
    answer: "Iteratsiya loop (for, while) yordamida takrorlashni amalga oshiradi. Rekursiya esa funksiyaning o'zini o'zi qayta chaqirishi orqali ishlaydi. Rekursiya ko'proq stack xotira talab qiladi.",
  },
  {
    id: "int_39",
    question: "Python-da ternary operator (shartli ifoda) qanday yoziladi?",
    category: "Basics",
    answer: "Python-da ternary operator inline if-else shaklida yoziladi: value_if_true if condition else value_if_false.",
    codeExample: `status = "Katta" if yosh >= 18 else "Yosh"`
  },
  {
    id: "int_40",
    question: "Slice step [::-1] qanday ishlaydi?",
    category: "Basics",
    answer: "Slicing jarayonida uchinchi parametr qadam (step) hisoblanadi. -1 qiymati ro'yxat yoki satrni oxiridan boshiga qarab teskari tartibda o'qishni bildiradi.",
    codeExample: `s = "salom"
print(s[::-1])  # molas`
  },
  {
    id: "int_41",
    question: "eval() va exec() farqlari va ulardan foydalanish xavfi nimada?",
    category: "Basics",
    answer: "eval() satr ko'rinishidagi bitta Python ifodasini baholaydi va qiymat qaytarmaydi. exec() esa ko'p qatorli Python kodlarini ishga tushiradi. Ular foydalanuvchi kiritgan satrlar bilan ishlatilganda xavfsizlikka (kod inyeksiyasiga) katta xavf tug'diradi.",
  },
  {
    id: "int_42",
    question: "* (unpacking) operatori qanday ishlaydi?",
    category: "Basics",
    answer: "* operatori ro'yxat, tuple yoki generatorlarni alohida elementlarga yoyib yuborish (unpacking) uchun ishlatiladi.",
    codeExample: `a, *b, c = [1, 2, 3, 4]
# a = 1, b = [2, 3], c = 4`
  },
  {
    id: "int_43",
    question: "Python 3.10 dagi match-case (pattern matching) xususiyati nima?",
    category: "Basics",
    answer: "match-case boshqa tillardagi switch-case operatorining takomillashgan ko'rinishidir. U qiymatlarni nafaqat solishtiradi, balki ularning tuzilishi va tiplari bo'yicha ham tekshiradi (destructuring).",
    codeExample: `match status:
    case 200: print("Ok")
    case _: print("Noma'lum")`
  },
  {
    id: "int_44",
    question: "itertools moduli nima uchun xizmat qiladi?",
    category: "Basics",
    answer: "itertools moduli samarali va tezkor iteratorlar bilan ishlash uchun mo'ljallangan. Unda kombinatsiyalar (combinations), permutatsiyalar (permutations) va cheksiz sikllar (cycle) kabi funksiyalar mavjud.",
  },
  {
    id: "int_45",
    question: "Yuqori tartibli funksiyalar (High-order functions) nima?",
    category: "Basics",
    answer: "Boshqa funksiyalarni argument sifatida qabul qiladigan yoki natija sifatida funksiya qaytaradigan funksiyalar yuqori tartibli funksiyalar deyiladi. Masalan: map, filter, decorators.",
  },
  {
    id: "int_46",
    question: "functools.lru_cache dekoratori nima vazifani bajaradi?",
    category: "Basics",
    answer: "U funksiya natijalarini keshlab boradi (Least Recently Used algoritmi asosida). Agar funksiya avval yuborilgan argumentlar bilan yana chaqirilsa, natija hisoblanmasdan keshdan olinadi.",
    codeExample: `from functools import lru_cache
@lru_cache(maxsize=128)
def fib(n): pass`
  },
  {
    id: "int_47",
    question: "Python'da math va cmath modullari orasidagi farq nima?",
    category: "Basics",
    answer: "math moduli faqat haqiqiy sonlar (real numbers) ustida matematik amallarni bajaradi. cmath moduli esa kompleks sonlar (complex numbers) uchun mo'ljallangan.",
  },
  {
    id: "int_48",
    question: "json modulidagi dump/dumps va load/loads farqi nimada?",
    category: "Basics",
    answer: "dumps va loads satrlar (strings) bilan ishlaydi. dump va load esa bevosita fayllar (file-like objects) bilan JSON formatda ma'lumot yozish va o'qish uchun ishlatiladi.",
    codeExample: `import json
s = json.dumps({"a": 1})  # Satrga o'giradi`
  },
  {
    id: "int_49",
    question: "Virtual environment (venv) nima va nima uchun kerak?",
    category: "Basics",
    answer: "Virtual environment har bir Python loyihasi uchun kutubxonalar va bog'liqliklarni alohida, izolyatsiya qilingan muhitda saqlash imkonini beradi. Bu global tizimdagi paketlar to'qnashuvini oldini oladi.",
  },
  {
    id: "int_50",
    question: "importlib yordamida dynamic import qanday amalga oshiriladi?",
    category: "Basics",
    answer: "Satr ko'rinishidagi modul nomini ish vaqtida dinamik import qilish uchun importlib.import_module() funksiyasidan foydalaniladi.",
    codeExample: `import importlib
math = importlib.import_module("math")`
  },

  // ==================== OOP - ADVANCED (51 - 100) ====================
  {
    id: "int_51",
    question: "Class attribute va Instance attribute farqi nimada?",
    category: "OOP - Advanced",
    answer: "Class attribute klass darajasida e'lon qilinadi va barcha obyektlar uchun umumiy bo'ladi. Instance attribute esa __init__ ichida self orqali yaratilib, faqat o'sha muayyan obyektga tegishli bo'ladi.",
    codeExample: `class A:
    x = 1  # Class attr
    def __init__(self):
        self.y = 2  # Instance attr`
  },
  {
    id: "int_52",
    question: "Multiple Inheritance va Method Resolution Order (MRO) nima?",
    category: "OOP - Advanced",
    answer: "Multiple Inheritance - klass bir nechta ota klassdan meros olishi. MRO (Method Resolution Order) esa voris klassda chaqirilgan metod qaysi ota klasslardan qanday ketma-ketlikda qidirilishini belgilovchi algoritm (C3 Linearization) hisoblanadi.",
  },
  {
    id: "int_53",
    question: "super() funksiyasi qanday ishlaydi?",
    category: "OOP - Advanced",
    answer: "super() joriy klassning MRO navbatidagi keyingi klass metodini chaqirish uchun xizmat qiladi. U faqat bevosita ota klassni emas, balki ko'p vorislik zanjiridagi navbatdagi klassni chaqiradi.",
  },
  {
    id: "int_54",
    question: "Metaclass nima va u qanday yaratiladi?",
    category: "OOP - Advanced",
    answer: "Metaclass - klasslarni yaratish qolipidir. Python'da klasslar ham obyekt bo'lib, ular metaklass (default: type) orqali yaratiladi. Custom metaklass type klassidan meros olgan holda yaratiladi.",
    codeExample: `class MyMeta(type):
    def __new__(cls, name, bases, dct):
        return super().__new__(cls, name, bases, dct)`
  },
  {
    id: "int_55",
    question: "Abstract Base Class (ABC) nima va u qachon ishlatiladi?",
    category: "OOP - Advanced",
    answer: "ABC bu to'g'ridan-to'g'ri obyekti yaratilmaydigan, faqat boshqa klasslarga interfeys andozasini beruvchi klassdir. @abstractmethod orqali voris klasslarga majburiy metodlar yuklatiladi.",
    codeExample: `from abc import ABC, abstractmethod
class Shape(ABC):
    @abstractmethod
    def area(self): pass`
  },
  {
    id: "int_56",
    question: "Diamond Problem (Romb ko'rinishidagi vorislik) nima va Python uni qanday hal qiladi?",
    category: "OOP - Advanced",
    answer: "Diamond Problem - D klassi B va C dan, ular esa o'z navbatida A klassidan vorislik olganda yuzaga keladigan metod to'qnashuvidir. Python buni MRO algoritmi (chapdan-o'ngga, chuqurlik bo'yicha) orqali bir xil klassni takrorlamasdan hal qiladi.",
  },
  {
    id: "int_57",
    question: "@property dekoratori getter, setter va deleter yaratishda qanday ishlatiladi?",
    category: "OOP - Advanced",
    answer: "U atributlarga xavfsiz kirish va ularni tekshirib o'zgartirish uchun ishlatiladi. Metodlarni oddiy o'zgaruvchi kabi chaqirish imkonini beradi.",
    codeExample: `class User:
    def __init__(self): self._age = 0
    @property
    def age(self): return self._age
    @age.setter
    def age(self, val): self._age = val`
  },
  {
    id: "int_58",
    question: "@classmethod va @staticmethod farqi nimada?",
    category: "OOP - Advanced",
    answer: "@classmethod birinchi argument sifatida klassni (cls) qabul qiladi va klass holatini o'zgartirish uchun ishlatiladi. @staticmethod esa hech qanday klass yoki obyekt holatini qabul qilmaydigan mustaqil yordamchi funksiyadir.",
  },
  {
    id: "int_59",
    question: "__str__ va __repr__ dunder metodlari orasidagi farq nima?",
    category: "OOP - Advanced",
    answer: "__str__ oxirgi foydalanuvchi tushunishi oson bo'lgan chiroyli matnli ko'rinishni (human-readable) qaytaradi. __repr__ esa dasturchilar uchun obyektning texnik, aniq ifodasini (developer-oriented) ifodalaydi.",
  },
  {
    id: "int_60",
    question: "Descriptor Protocol nima va u qanday metodlardan iborat?",
    category: "OOP - Advanced",
    answer: "Descriptor - atributlarga murojaat qilishni (get, set, delete) boshqaruvchi klassdir. U __get__(self, instance, owner), __set__(self, instance, value) va __delete__(self, instance) metodlaridan tashkil topadi.",
  },
  {
    id: "int_61",
    question: "Python-da Operator Overloading (operatorlarni qayta yuklash) nima?",
    category: "OOP - Advanced",
    answer: "Operator overloading klasslarning standart amallarda (+, -, *, ==) o'zini qanday tutishini dunder metodlar orqali qayta yozish imkoniyatidir.",
    codeExample: `class Num:
    def __init__(self, n): self.n = n
    def __add__(self, other): return Num(self.n + other.n)`
  },
  {
    id: "int_62",
    question: "__slots__ nima va u xotirani qanday tejaydi?",
    category: "OOP - Advanced",
    answer: "Slots klass obyektlariga dinamik atributlar qo'shish uchun ochiladigan __dict__ lug'atini bekor qiladi. Buning o'rniga faqat ko'rsatilgan atributlar ro'yxatini belgilaydi va xotira sarfini sezilarli darajada kamaytiradi.",
    codeExample: `class A:
    __slots__ = ['name']`
  },
  {
    id: "int_63",
    question: "Inkapsulyatsiya va Name Mangling (nomlarni buzish) nima?",
    category: "OOP - Advanced",
    answer: "Python-da qat'iy private tushunchasi yo'q. Atribut boshiga ikkita tagchiziq (__secret) yozilsa, Python uning nomini avtomatik ravishda _ClassName__secret ko'rinishiga o'zgartiradi (Name Mangling) va tashqi to'g'ridan-to'g'ri ulanishni qiyinlashtiradi.",
  },
  {
    id: "int_64",
    question: "__getattr__ va __getattribute__ orasidagi farq nima?",
    category: "OOP - Advanced",
    answer: "__getattribute__ har qanday atribut chaqirilganda birinchi bo'lib ishlaydi. __getattr__ esa faqat so'ralgan atribut obyekt tarkibida topilmaganda (AttributeError berishdan oldin) ishga tushadi.",
  },
  {
    id: "int_65",
    question: "__new__ va __init__ dunder metodlari farqi nimada?",
    category: "OOP - Advanced",
    answer: "__new__ bu klassdan obyekt yaratuvchi (constructor) metod bo'lib, u yangi instance qaytaradi. __init__ esa yaratilgan obyektni boshlang'ich qiymatlovchi (initializer) metoddir.",
  },
  {
    id: "int_66",
    question: "__call__ dunder metodi nima vazifa bajaradi?",
    category: "OOP - Advanced",
    answer: "Agar klass tarkibida __call__ metodi yozilsa, ushbu klassdan olingan obyektlarni funksiya kabi qavslar bilan chaqirish (callable qilish) mumkin bo'ladi.",
    codeExample: `class A:
    def __call__(self): print("Chaqirildi")
obj = A()
obj() # Chaqirildi`
  },
  {
    id: "int_67",
    question: "Multiple dispatch va Python-da polimorfizm qanday amalga oshiriladi?",
    category: "OOP - Advanced",
    answer: "Python default holatda method overloading-ni qo'llab-quvvatlamaydi (bir xil nomli metod yozilsa oxirgisi qoladi). Polimorfizm asosan dynamic typing (duck typing) orqali yoki typing modulidagi @overload dekoratorlari yordamida amalga oshiriladi.",
  },
  {
    id: "int_68",
    question: "Custom Context Manager yaratishda qaysi metodlar yozilishi kerak?",
    category: "OOP - Advanced",
    answer: "Custom Context Manager yaratish uchun klass ichida __enter__ (resursni tayyorlaydi) va __exit__ (resursni yopadi va xatolarni boshqaradi) metodlari yozilishi shart.",
  },
  {
    id: "int_69",
    question: "Duck Typing nima?",
    category: "OOP - Advanced",
    answer: "Bu 'Agar u o'rdak kabi yursa va o'rdak kabi baqirsa, u o'rdakdir' tamoyilidir. Ya'ni obyektning qaysi klassdan olingani muhim emas, eng muhimi unda kerakli metod yoki atributning mavjudligidir.",
  },
  {
    id: "int_70",
    question: "__del__ (destructor) dunder metodi qachon ishlaydi?",
    category: "OOP - Advanced",
    answer: "__del__ metodi obyekt xotiradan butunlay o'chirilayotganda (reference count 0 ga tushganda yoki GC ishga tushganda) avtomatik chaqiriladigan destruktordir.",
  },
  {
    id: "int_71",
    question: "Method chaining (metodlar zanjiri) qanday yoziladi?",
    category: "OOP - Advanced",
    answer: "Method chaining yaratish uchun klass metodlari o'z ishini tugatgandan so'ng joriy obyektni, ya'ni self-ni qaytarishi (return self) kerak.",
    codeExample: `class Person:
    def set_name(self, name):
        self.name = name
        return self`
  },
  {
    id: "int_72",
    question: "Mixins (miksinlar) nima va ular qanday ishlatiladi?",
    category: "OOP - Advanced",
    answer: "Mixin - bu alohida obyekt sifatida yaratilmaydigan, faqat boshqa klasslarga ma'lum bir funksionallik (metodlar) qo'shish uchun mo'ljallangan kichik ota klasslardir.",
  },
  {
    id: "int_73",
    question: "Python-da Singleton andozasi qanday yoziladi?",
    category: "OOP - Advanced",
    answer: "Singleton klassdan faqat bitta obyekt olinishini kafolatlaydi. Buni __new__ metodini qayta yozish orqali amalga oshirish mumkin.",
    codeExample: `class Singleton:
    _instance = None
    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance`
  },
  {
    id: "int_74",
    question: "@dataclass nima va uning afzalligi nimada?",
    category: "OOP - Advanced",
    answer: "@dataclass yordamida Python avtomatik ravishda __init__, __repr__, __eq__ kabi metodlarni o'zi yozib beradi. Bu asosan ma'lumotlarni saqlovchi klasslarni qisqa yozishda ishlatiladi.",
    codeExample: `from dataclasses import dataclass
@dataclass
class Point:
    x: int
    y: int`
  },
  {
    id: "int_75",
    question: "Custom Iterator yaratish uchun qaysi dunder metodlar yoziladi?",
    category: "OOP - Advanced",
    answer: "Custom Iterator yaratish uchun obyekt klassida __iter__ (o'zini qaytaradi) va __next__ (navbatdagi elementni qaytaradi yoki StopIteration beradi) metodlari bo'lishi shart.",
  },
  {
    id: "int_76",
    question: "Sequence protokoli va __getitem__ vazifasi nima?",
    category: "OOP - Advanced",
    answer: "__getitem__ dunder metodi klass obyektini xuddi ro'yxat kabi indeks orqali (obj[0] yoki obj['key']) o'qish imkonini beradi.",
    codeExample: `class MyList:
    def __getitem__(self, index): return index * 2`
  },
  {
    id: "int_77",
    question: "__contains__ dunder metodi nima uchun kerak?",
    category: "OOP - Advanced",
    answer: "Ushbu metod klass obyektlarida in operatorini ishlatish imkonini beradi. Ya'ni element to'plam ichida bor yoki yo'qligini tekshiradi.",
    codeExample: `class A:
    def __contains__(self, item): return item in [1, 2]`
  },
  {
    id: "int_78",
    question: "__eq__ va __hash__ dunder metodlari orasidagi bog'liqlik nima?",
    category: "OOP - Advanced",
    answer: "Agar klassda custom __eq__ (tenglik) yozilsa, Python avtomatik ravishda obyektni unhashable qilib qo'yadi. Agar uni set yoki dict kaliti qilmoqchi bo'lsak, __hash__ metodini ham birga qayta yozishimiz kerak.",
  },
  {
    id: "int_79",
    question: "Class Decorator (klass dekoratori) nima?",
    category: "OOP - Advanced",
    answer: "Class Decorator - bu klass ta'rifini argument sifatida qabul qilib, uni o'zgartiradigan yoki yangi klass qaytaradigan funksiyadir. U klass atributlarini dinamik o'zgartirishda qo'llaniladi.",
  },
  {
    id: "int_80",
    question: "__copy__ va __deepcopy__ dunder metodlari nima uchun kerak?",
    category: "OOP - Advanced",
    answer: "Ular copy.copy() va copy.deepcopy() funksiyalari chaqirilganda, custom klass obyektlaridan to'g'ri va xavfsiz nusxa olish mantiqini dasturchi tomonidan sozlash imkonini beradi.",
  },
  {
    id: "int_81",
    question: "type() funksiyasi yordamida dinamik klass qanday yaratiladi?",
    category: "OOP - Advanced",
    answer: "type(name, bases, dict) uchta argument bilan chaqirilganda dinamik ravishda yangi klass yaratib qaytaradi.",
    codeExample: `NewClass = type("NewClass", (object,), {"x": 10})`
  },
  {
    id: "int_82",
    question: "Interface va Abstract Class farqi nimada?",
    category: "OOP - Advanced",
    answer: "Python-da alohida Interface kalit so'zi yo'q. Abstract Class to'liq yozilmagan metodlarga ham, tayyor metodlarga ham ega bo'lishi mumkin. Interface vazifasini esa faqat @abstractmethod-lardan tashkil topgan ABC bajaradi.",
  },
  {
    id: "int_83",
    question: "isinstance() va type() == ... farqi nimada?",
    category: "OOP - Advanced",
    answer: "isinstance() obyektning o'zini va uning ota klasslarini ham (vorislikni hisobga olgan holda) tekshiradi. type() == ... esa vorislikni inkor qiladi va aniq o'sha klass ekanligini solishtiradi.",
  },
  {
    id: "int_84",
    question: "__dict__ atributi nima vazifani bajaradi?",
    category: "OOP - Advanced",
    answer: "U obyekt yoki klassning barcha dinamik atributlari va ularning qiymatlarini o'z ichiga olgan oddiy lug'at (dictionary) hisoblanadi.",
  },
  {
    id: "int_85",
    question: "Method Overriding (metodni qayta yozish) nima?",
    category: "OOP - Advanced",
    answer: "Ota klassdagi metod nomini va parametrlarini saqlagan holda, voris klass ichida uning mantiqini boshqacha ko'rinishda qayta yozish jarayonidir.",
  },
  {
    id: "int_86",
    question: "Composition (kompozitsiya) va Inheritance (merosxo'rlik) farqi nima?",
    category: "OOP - Advanced",
    answer: "Inheritance 'is-a' (vorislik) bog'lanishidir. Composition esa 'has-a' (tarkibida bor) bog'lanishi bo'lib, bir klass boshqa klass obyektidan o'z ichida foydalanishini ifodalaydi va u moslashuvchanroqdir.",
  },
  {
    id: "int_87",
    question: "Abstrakt xususiyatlar (Abstract property) qanday yaratiladi?",
    category: "OOP - Advanced",
    answer: "Abstrakt property yaratish uchun @property va @abstractmethod dekoratorlari birga qo'llaniladi.",
    codeExample: `class A(ABC):
    @property
    @abstractmethod
    def name(self): pass`
  },
  {
    id: "int_88",
    question: "__dir__ dunder metodi nima uchun ishlatiladi?",
    category: "OOP - Advanced",
    answer: "U dir() funksiyasi chaqirilganda obyektning ko'rsatilishi kerak bo'lgan atributlari va metodlari ro'yxatini qaytaradi.",
  },
  {
    id: "int_89",
    question: "Metodlarni dynamically klassga bog'lash (Method binding) qanday bo'ladi?",
    category: "OOP - Advanced",
    answer: "Oddiy funksiyani obyektga bog'lash uchun types.MethodType yordamida self argumentini joriy obyektga ulab olish kerak.",
    codeExample: `import types
obj.func = types.MethodType(my_func, obj)`
  },
  {
    id: "int_90",
    question: "__setattr__ va __delattr__ metodlari qachon ishga tushadi?",
    category: "OOP - Advanced",
    answer: "__setattr__ obyekt atributi qiymati o'zgartirilganda yoki yangi atribut qo'shilganda ishlaydi. __delattr__ esa atribut del yordamida o'chirilganda ishga tushadi.",
  },
  {
    id: "int_91",
    question: "Custom Metaclass yordamida klass yaratishni qanday cheklash mumkin?",
    category: "OOP - Advanced",
    answer: "Custom Metaclass-ning __new__ yoki __init__ metodlarida kelayotgan klass tarkibini (attributes, bases) tekshirib, shart bajarilmasa ValueError yoki TypeError berish orqali klass yaratish cheklanadi.",
  },
  {
    id: "int_92",
    question: "__init_subclass__ metodi nima uchun kerak?",
    category: "OOP - Advanced",
    answer: "U metaklass yozmasdan, ota klass orqali uning barcha voris klasslari (subclasses) yaratilish jarayonini kuzatish va ularni sozlash imkonini beruvchi yengil usuldir.",
  },
  {
    id: "int_93",
    question: "Klass nomlar fazosi (Class namespace) nima?",
    category: "OOP - Advanced",
    answer: "Klass ta'rifi ichidagi barcha o'zgaruvchilar va metodlar klassning o'z nomlar fazosini (namespace) hosil qiladi va bu xususiyatlar KlassName.__dict__ orqali saqlanadi.",
  },
  {
    id: "int_94",
    question: "Factory Method yaratishda @classmethod ning o'rni nimada?",
    category: "OOP - Advanced",
    answer: "Factory metodlar turli xil formatdagi kirish ma'lumotlariga ko'ra yangi obyekt yaratib qaytaradi. Ular birinchi argument sifatida cls (klass) qabul qilgani uchun klass obyektini to'g'ri yaratib bera oladi.",
  },
  {
    id: "int_95",
    question: "Method Wrapper va Bound Method farqi nimada?",
    category: "OOP - Advanced",
    answer: "Bound Method - bu obyektga bog'langan metod bo'lib, chaqirilganda self argumentini avtomat qabul qiladi. Method Wrapper esa o'rnatilgan (C-tilida yozilgan) dunder metodlarning o'rovchisidir.",
  },
  {
    id: "int_96",
    question: "__mro__ atributi nima qaytaradi?",
    category: "OOP - Advanced",
    answer: "U klassning MRO zanjirini ifodalovchi klass obyektlaridan iborat bo'lgan Tuple ro'yxatini qaytaradi.",
  },
  {
    id: "int_97",
    question: "Python-da super(CurrentClass, self) yozishning eski ma'nosi nima?",
    category: "OOP - Advanced",
    answer: "Python 2 da super funksiyasiga joriy klass nomi va self yuborilishi shart edi. Python 3 da bu jarayon soddalashtirildi va shunchaki super() deb yozish yetarli.",
  },
  {
    id: "int_98",
    question: "Dynamic method binding nima uchun ishlatiladi?",
    category: "OOP - Advanced",
    answer: "Dastur ishlash vaqtida (runtime) ma'lum bir obyektga yangi metodni dynamically qo'shish va uning self argumentini bog'lash uchun ishlatiladi.",
  },
  {
    id: "int_99",
    question: "hasattr(), getattr(), setattr() va delattr() vazifasi nima?",
    category: "OOP - Advanced",
    answer: "Ular atributlar nomlari satr (string) shaklida kelganda obyekt ustida dinamik amallar bajarishga (borligini tekshirish, o'qish, o'zgartirish, o'chirish) imkon beradi.",
  },
  {
    id: "int_100",
    question: "SOLID prinsiplari Python OOP dasturlashda qanday qo'llaniladi?",
    category: "OOP - Advanced",
    answer: "SOLID prinsiplari klasslarni kengayishga oson, moslashuvchan va mustahkam loyihalash qoidalaridir. Python duck typing va ABC yordamida interfeyslarni ajratish (Interface Segregation) va Liskov o'rinbosarligi prinsiplarini qo'llash juda oson.",
  },

  // ==================== SYSTEM & MEMORY (101 - 150) ====================
  {
    id: "int_101",
    question: "Integer Caching / Integer Interning mexanizmi nima?",
    category: "System & Memory",
    answer: "Python tezlikni oshirish uchun -5 dan 256 gacha bo'lgan butun sonlarni oldindan yaratib xotirada keshlab qo'yadi. Ushbu diapazondagi sonlar har doim xotiradagi bitta manzilga ishora qiladi.",
    codeExample: `a = 256
b = 256
print(a is b) # True`
  },
  {
    id: "int_102",
    question: "String Interning nima va u qanday ishlaydi?",
    category: "System & Memory",
    answer: "String Interning - bir xil matnli satrlarni xotirada faqat bitta nusxada saqlashdir. Python identifikator ko'rinishidagi satrlarni avtomatik intern qiladi. sys.intern() orqali buni qo'lda ham qilish mumkin.",
  },
  {
    id: "int_103",
    question: "Reference Counting (havolalar hisobi) mexanizmi qanday ishlaydi?",
    category: "System & Memory",
    answer: "Python-da har bir obyektga nechta o'zgaruvchi bog'langani (havola) hisoblab boriladi. Ushbu ko'rsatkich 0 ga tushishi bilan obyekt xotiradan zudlik bilan o'chiriladi.",
  },
  {
    id: "int_104",
    question: "Cyclical References (aylanma havolalar) qanday xotira muammosini keltirib chiqaradi?",
    category: "System & Memory",
    answer: "Ikki obyekt bir-biriga havola qilsa, ularning havolalar soni hech qachon 0 ga tushmaydi. Reference counting buni tozalay olmaydi va xotira to'lib qoladi. Python buni generational Garbage Collector yordamida sikllarni aniqlab tozalaydi.",
  },
  {
    id: "int_105",
    question: "Kuchsiz havola (Weak Reference) nima va u qachon ishlatiladi?",
    category: "System & Memory",
    answer: "Weak reference (weakref moduli) obyektning reference count (havolalar soni) qiymatini oshirmasdan unga ulanish imkonini beradi. Obyekt o'chsa, kuchsiz havola avtomatik None qaytaradi. U asosan keshlar yozishda ishlatiladi.",
    codeExample: `import weakref
r = weakref.ref(obj)`
  },
  {
    id: "int_106",
    question: "Python-da list (ro'yxat) xotirada qanday saqlanadi va dinamik kengayishi qanday kechadi?",
    category: "System & Memory",
    answer: "List - bu boshqa obyektlar manzillari (pointerlar) massividir. Massiv to'lganda Python xotiradan kattaroq joy ajratadi (over-allocation formulasi bilan) va pointerlarni ko'chiradi. Bu element qo'shishni tezlashtiradi.",
  },
  {
    id: "int_107",
    question: "Dictionary (lug'at) xotira tuzilishi qanday va hash collision qanday hal qilinadi?",
    category: "System & Memory",
    answer: "Dictionary hash-jadval asosida ishlaydi. Har bir kalitning hashi jadvaldagi indeksni aniqlaydi. To'qnashuv (collision) yuz berganda open addressing va quadratic probing orqali boshqa bo'sh indeks qidiriladi.",
  },
  {
    id: "int_108",
    question: "sys.getsizeof() nima va uning qanday cheklovlari bor?",
    category: "System & Memory",
    answer: "sys.getsizeof() obyektning o'zi band qilgan xotirani (overhead) qaytaradi, lekin obyekt ichidagi elementlar (konteyner ichidagi obyektlar) xotira hajmini hisoblamaydi.",
    codeExample: `import sys
print(sys.getsizeof([1, 2]))`
  },
  {
    id: "int_109",
    question: "Stack va Heap xotiralarining farqi nimada?",
    category: "System & Memory",
    answer: "Stack funksiya chaqiruv freymlari va lokal o'zgaruvchilarni saqlaydigan juda tezkor va kichik xotira. Heap esa barcha dinamik obyektlar saqlanadigan va Garbage Collector nazorat qiladigan katta xotira maydonidir.",
  },
  {
    id: "int_110",
    question: "Python dasturlarida xotira sizib chiqishi (Memory Leak) sabablari?",
    category: "System & Memory",
    answer: "Asosiy sabablar: global o'zgaruvchilar to'plamlariga ma'lumot qo'shib borish va toza qilmaslik, yopilmay qolgan fayl/ulanishlar, aylanma havolalar va C-extensions kutubxonalaridagi xatolar.",
  },
  {
    id: "int_111",
    question: "Tuple va List xotira sarfi bo'yicha qanday farqlanadi?",
    category: "System & Memory",
    answer: "List o'zgaruvchan bo'lgani uchun zaxira xotira ajratish overhead-iga ega. Tuple esa o'zgarmas bo'lgani uchun aniq o'z hajmiga mos xotira ajratadi, ortiqcha zaxira overhead bo'lmaydi va xotirani tejaydi.",
  },
  {
    id: "int_112",
    question: "Lokal o'zgaruvchiga murojaat global o'zgaruvchiga qaraganda nega tezroq?",
    category: "System & Memory",
    answer: "Lokal o'zgaruvchilar byte-code darajasida aniq indeksli massivda (LOAD_FAST) qidiriladi. Global o'zgaruvchilar esa modul darajasidagi lug'at (dictionary key lookup - LOAD_GLOBAL) ichidan qidiriladi, bu ancha sekinroq.",
  },
  {
    id: "int_113",
    question: "Python-da private heap deganda nima tushuniladi?",
    category: "System & Memory",
    answer: "Private heap - bu Python interpreter (CPython) tomonidan to'liq boshqariladigan va barcha Python obyektlari saqlanadigan xususiy xotira maydonidir. Dasturchi unga bevosita kirish huquqiga ega emas.",
  },
  {
    id: "int_114",
    question: "gc moduli yordamida Garbage Collector qanday boshqariladi?",
    category: "System & Memory",
    answer: "gc.collect() orqali aylanma bog'lanishlarni tozalash majburiy chaqiriladi. gc.disable() yordamida esa GC faoliyati vaqtincha to'xtatib turilishi mumkin (tezkor hisoblashlar vaqtida).",
  },
  {
    id: "int_115",
    question: "id() funksiyasi qaytaradigan qiymat nima?",
    category: "System & Memory",
    answer: "CPython-da id() funksiyasi obyektning xotiradagi (RAM) haqiqiy virtual manzilini (butun son ko'rinishida) qaytaradi.",
    codeExample: `print(id(obj))`
  },
  {
    id: "int_116",
    question: "CPython-da PyObject strukturasining vazifasi nimada?",
    category: "System & Memory",
    answer: "CPython-da barcha obyektlarning asosi PyObject strukturasi hisoblanadi. U o'z ichida havolalar soni (ob_refcnt) va obyekt turi ko'rsatkichini (ob_type) saqlaydi.",
  },
  {
    id: "int_117",
    question: "Mutable va Immutable obyektlarning xotiradagi farqi nima?",
    category: "System & Memory",
    answer: "Immutable obyektlar qiymati o'zgartirilganda xotirada yangi obyekt yaratiladi. Mutable obyektlar esa qiymat o'zgartirilganda xotiradagi o'z manzilini saqlab qolgan holda elementlarini o'zgartiradi.",
  },
  {
    id: "int_118",
    question: "CPython compiler, parser va AST zanjiri qanday ishlaydi?",
    category: "System & Memory",
    answer: "Python kodi dastlab Parser orqali o'qilib AST (Abstract Syntax Tree) daraxtini hosil qiladi. Keyin Compiler AST daraxtini byte-code-ga o'tkazadi va u PVM (Python Virtual Machine) tomonidan ishga tushiriladi.",
  },
  {
    id: "int_119",
    question: "sys.getrefcount() nimani qaytaradi va u nega kutilgandan 1 taga ko'p?",
    category: "System & Memory",
    answer: "U obyektga ulangan havolalar sonini qaytaradi. Chaqirilganda getrefcount funksiyasining o'zi ham ushbu obyektni argument sifatida qabul qilgani uchun havolalar soni vaqtincha 1 taga ko'p ko'rsatiladi.",
  },
  {
    id: "int_120",
    question: "Small integers caching (butun sonlar keshi) nima uchun kerak?",
    category: "System & Memory",
    answer: "Dasturlashda eng ko'p ishlatiladigan kichik sonlarni xotirada qayta-qayta yaratish va o'chirishga ketadigan vaqt overhead-ini kamaytirish uchun keshlab qo'yiladi.",
  },
  {
    id: "int_121",
    question: "Python interpreter turlari (CPython, PyPy, Jython) farqi nimada?",
    category: "System & Memory",
    answer: "CPython - standart C tilida yozilgan interpreter. PyPy - JIT compiler yordamida kodni juda tez ishlatadigan muqobil interpreter. Jython esa Java virtual mashinasida (JVM) ishlaydi.",
  },
  {
    id: "int_122",
    question: "JIT (Just-In-Time) compilation nima?",
    category: "System & Memory",
    answer: "JIT interpretatsiya vaqtida ko'p ishlaydigan kod qismlarini (hot spots) to'g'ridan-to'g'ri mashina kodiga (protsessor buyruqlariga) o'tkazib keshlash orqali tezlikni oshirish texnologiyasidir.",
  },
  {
    id: "int_123",
    question: "__slots__ xotira sarfini qancha foizgacha tejaydi?",
    category: "System & Memory",
    answer: "Millionlab obyektlar yaratilganda slots __dict__ overhead-ini olib tashlagani sababli xotira sarfini 40-50% gacha tejashi va obyektlarga kirish tezligini oshirishi isbotlangan.",
  },
  {
    id: "int_124",
    question: "tracemalloc moduli nima uchun ishlatiladi?",
    category: "System & Memory",
    answer: "tracemalloc - Python dasturi xotira bloklarini qayerda va qancha ajratayotganini kuzatish (xotira leak-larini topish) uchun ishlatiladigan ichki kutubxonadir.",
    codeExample: `import tracemalloc
tracemalloc.start()`
  },
  {
    id: "int_125",
    question: "gc.get_referrers() va gc.get_referents() farqi nimada?",
    category: "System & Memory",
    answer: "get_referrers() berilgan obyektga havola qilayotgan (uni o'zida saqlayotgan) boshqa obyektlarni qaytaradi. get_referents() esa berilgan obyekt havola qilayotgan ichki obyektlarni qaytaradi.",
  },
  {
    id: "int_126",
    question: "Generational Garbage Collection qanday ishlaydi?",
    category: "System & Memory",
    answer: "Python GC obyektlarni 3 ta avlodga (Gen 0, 1, 2) ajratadi. Yangi yaratilgan obyektlar Gen 0 ga tushadi. GC tekshiruvidan omon qolganlar yuqori avlodga o'tadi. Gen 0 tez-tez, Gen 2 esa kamdan-kam tekshiriladi.",
  },
  {
    id: "int_127",
    question: "Memory fragmentation (xotira parchalanishi) nima?",
    category: "System & Memory",
    answer: "Obyektlar xotiraga yozilib o'chirilganda RAMda bo'sh kataklar tartibsiz tarqalib qoladi. Natijada umumiy bo'sh joy yetarli bo'lsa ham, katta blok talab qiladigan yangi obyekt uchun joy topilmasligi mumkin.",
  },
  {
    id: "int_128",
    question: "ctypes yordamida Python o'zgaruvchisi xotira qiymatini qanday o'qish mumkin?",
    category: "System & Memory",
    answer: "ctypes yordamida id(obj) manzili orqali bevosita xotira xujrasidagi PyObject ma'lumotlarini o'qish mumkin.",
    codeExample: `import ctypes
# ctypes.cast(id_val, ctypes.py_object)`
  },
  {
    id: "int_129",
    question: "mmap moduli nima uchun kerak?",
    category: "System & Memory",
    answer: "mmap juda katta hajmli fayllarni to'liq xotiraga (RAM) yuklamasdan, ularni virtual xotira manzillar fazosiga bog'lab (memory mapping) fayl bilan juda tez ishlash imkonini beradi.",
  },
  {
    id: "int_130",
    question: "Buffer protocol va memoryview nima?",
    category: "System & Memory",
    answer: "Buffer protocol obyektlar ma'lumotlariga xotirada nusxa olmasdan bevosita kirish imkonini beradi. memoryview esa ushbu protokol ustida ishlovchi, baytlar massivini kesib olishda nusxalash xarajatlarini (zero-copy) nolga tushiruvchi obyektdir.",
  },
  {
    id: "int_131",
    question: "Python-da float sonlarning IEEE 754 aniqlik muammosi nima?",
    category: "System & Memory",
    answer: "Kompyuterlar sonlarni ikkilik tizimda saqlaydi, shuning uchun ba'zi o'nlik kasr sonlar (masalan, 0.1) cheksiz davriy kasr bo'lib qoladi va hisoblashda kichik noaniqliklar yuz beradi.",
    codeExample: `print(0.1 + 0.2 == 0.3)  # False`
  },
  {
    id: "int_132",
    question: "__del__ metodi GC ishiga qanday to'sqinlik qiladi?",
    category: "System & Memory",
    answer: "Python 3.4 dan oldin __del__ yozilgan va aylanma bog'langan obyektlar GC tomonidan avtomat tozalana olmasdi. Hozirda bu muammo PEP 442 orqali hal qilingan bo'lsa-da, __del__ ichida xatolar yozish xavfli.",
  },
  {
    id: "int_133",
    question: "CPython-da LOAD_FAST va LOAD_GLOBAL byte-code farqi nimada?",
    category: "System & Memory",
    answer: "LOAD_FAST lokal o'zgaruvchilarni massiv indeksidan tezkor yuklaydi. LOAD_GLOBAL esa global lug'atdan qidiradi va nisbatan ko'proq CPU tsikli talab qiladi.",
  },
  {
    id: "int_134",
    question: "String concatenation (+ vs .join()) tezlik farqi nima?",
    category: "System & Memory",
    answer: "+ operatori har safar yangi satr yaratib xotirani ko'chiradi (O(N^2) murakkablik). .join() esa dastlab yakuniy satr hajmini hisoblab, xotirani bir marta ajratadi va elementlarni tezkor ko'chiradi (O(N)).",
  },
  {
    id: "int_135",
    question: "Frozenset xotira jihatdan oddiy set dan qanday farq qiladi?",
    category: "System & Memory",
    answer: "Frozenset o'zgarmas bo'lgani uchun uning hash jadvali hajmi dinamik o'smaydi va u minimal xotira overhead-iga ega.",
  },
  {
    id: "int_136",
    question: "list.clear() va del list farqi nimada?",
    category: "System & Memory",
    answer: "list.clear() ro'yxat obyekti xotirada saqlagan holda uning ichidagi elementlar havolalarini tozalaydi. del esa ro'yxat o'zgaruvchisini va u orqali obyektni butunlay o'chirishga harakat qiladi.",
  },
  {
    id: "int_137",
    question: "__pycache__ papkasi nima uchun hosil bo'ladi?",
    category: "System & Memory",
    answer: "Unda import qilingan modullarning kompilyatsiya qilingan byte-code fayllari (.pyc) saqlanadi, bu modul qayta chaqirilganda tezroq yuklanishini ta'minlaydi.",
  },
  {
    id: "int_138",
    question: "PyMalloc (CPython heap allocator) nima?",
    category: "System & Memory",
    answer: "PyMalloc - CPython-ning kichik obyektlar (512 baytdan kichik) uchun mo'ljallangan maxsus xotira ajratuvchi tizimidir. U OS ning standart malloc tizimiga murojaatlarni kamaytiradi va tez ishlaydi.",
  },
  {
    id: "int_139",
    question: "array moduli va list farqi xotirada qanday?",
    category: "System & Memory",
    answer: "list pointerlar ro'yxatini saqlaydi (har xil tiplarni qo'llaydi). array moduli esa elementlarni xotirada ketma-ket, bir xil tipda (C-tilidagi massivlar kabi pointerlarsiz) saqlaydi va juda kam joy egallaydi.",
  },
  {
    id: "int_140",
    question: "Global Interpreter Lock (GIL) xotira boshqaruvida qanday rol o'ynaydi?",
    category: "System & Memory",
    answer: "GIL CPython-da havolalar soni (reference count) hisoblagichining parallel oqimlar (threads) tomonidan buzilishini (race condition) oldini olish uchun xizmat qiladi.",
  },
  {
    id: "int_141",
    question: "None obyekti xotirada nega 16 baytdan ko'p joy egallaydi?",
    category: "System & Memory",
    answer: "None ham Python-da to'liq obyekt (PyObject struct) hisoblanadi. Unda ham reference count va type pointer borligi sababli 64-bitli tizimlarda kamida 16-24 bayt overhead bo'ladi.",
  },
  {
    id: "int_142",
    question: "String split() xotira overhead-i nimadan iborat?",
    category: "System & Memory",
    answer: "split() yangi list yaratadi va har bir bo'lingan qism uchun yangi string obyektlarini xotirada hosil qiladi, bu katta matnlarda xotira yuklamasini oshiradi.",
  },
  {
    id: "int_143",
    question: "objgraph kutubxonasi yordamida xotira sizishi qanday aniqlanadi?",
    category: "System & Memory",
    answer: "objgraph obyektlar orasidagi bog'lanishlarni grafik ko'rinishida ko'rsatib, xotirada qolib ketgan, o'chmayotgan obyektlar zanjirini vizual aniqlash imkonini beradi.",
  },
  {
    id: "int_144",
    question: "Python C-extensions yaratishda Py_INCREF va Py_DECREF vazifasi nima?",
    category: "System & Memory",
    answer: "Ular C-kod ichidan turib Python obyektlarining havolalar sonini mos ravishda oshirish va kamaytirish orqali xotira xavfsizligini ta'minlash uchun ishlatiladi.",
  },
  {
    id: "int_145",
    question: "Python obyekti o'chirilganda xotira OS ga qaytariladimi?",
    category: "System & Memory",
    answer: "Kichik obyektlar o'chirilganda xotira PyMalloc pool-larida saqlab qolinadi va keyingi obyektlar uchun qayta ishlatiladi. Faqat katta xotira arenalari butunlay bo'shagandagina OS ga qaytariladi.",
  },
  {
    id: "int_146",
    question: "CPython memory pools va block allocators nima?",
    category: "System & Memory",
    answer: "Xotira arenalari (arenas - 256KB) pool-larga (4KB) va block-larga (turli o'lchamdagi xujralar) bo'linadi. Bu kichik o'lchamdagi obyektlarni juda tez xotira bilan ta'minlashga xizmat qiladi.",
  },
  {
    id: "int_147",
    question: "sys.set_coroutine_origin_tracking_depth nima uchun kerak?",
    category: "System & Memory",
    answer: "U asinxron korutinalar qayerda va qanday yaratilganini kuzatish chuqurligini belgilaydi, asinxron debugging va xotira tahlilida ishlatiladi.",
  },
  {
    id: "int_148",
    question: "Tuple interning (keshlash) qanday ishlaydi?",
    category: "System & Memory",
    answer: "Python ba'zi bo'sh yoki juda kichik o'zgarmas tuple-larni avtomatik keshlab qo'yadi va qayta foydalanadi.",
  },
  {
    id: "int_149",
    question: "Dict hash-jadval load factor va resizing nima?",
    category: "System & Memory",
    answer: "Load factor - jadvalning to'lish ko'rsatkichi (odatda 2/3). Agar jadval 2/3 qismga to'lsa, collision-larni kamaytirish uchun Python jadval o'lchamini 4 baravar (katta jadvallarda 2 baravar) oshiradi.",
  },
  {
    id: "int_150",
    question: "Python dasturida xotirani tejashning eng yaxshi 3 ta usuli?",
    category: "System & Memory",
    answer: "1. Katta obyektlar ro'yxatida __slots__ dan foydalanish.\n2. Butun ro'yxat o'rniga generatorlardan (yield) foydalanish.\n3. Katta massivlar uchun list o'rniga array yoki numpy-ni ishlatish.",
  },

  // ==================== CONCURRENCY (151 - 200) ====================
  {
    id: "int_151",
    question: "Multiprocessing va Multithreading orasidagi asosiy farq nima?",
    category: "Concurreny",
    answer: "Multithreading bitta jarayon ichida bir nechta oqim yaratadi va xotira umumiy bo'ladi. GIL sababli u CPU-bound vazifalarda parallel ishlamaydi. Multiprocessing esa OS darajasida alohida jarayonlar ochadi (alohida xotira), GIL cheklovi yo'q.",
  },
  {
    id: "int_152",
    question: "Thread Safety nima va Lock hamda RLock nima uchun kerak?",
    category: "Concurreny",
    answer: "Thread safety - parallel oqimlar bitta o'zgaruvchini o'zgartirmoqchi bo'lganda yuz beradigan to'qnashuvlarning (race condition) oldini olishdir. Lock resursni faqat bitta thread uchun band qiladi. RLock esa o'sha thread-ning o'zi uchun rekursiv qulflash imkonini beradi.",
    codeExample: `from threading import Lock
lock = Lock()
with lock:
    # Xavfsiz kod`
  },
  {
    id: "int_153",
    question: "Event Loop (Voqealar tsikli) asinxron dasturlashda qanday ishlaydi?",
    category: "Concurreny",
    answer: "Event Loop tayyor asinxron vazifalarni (tasks) navbat bilan bajaradi. Agar vazifa I/O operatsiyasini kutib qolsa, Event Loop uni vaqtincha to'xtatib, boshqa tayyor vazifalarni bajarishga o'tadi.",
  },
  {
    id: "int_154",
    question: "asyncio.gather va asyncio.wait orasidagi farq nima?",
    category: "Concurreny",
    answer: "asyncio.gather() vazifalarni parallel ishga tushirib natijalarni tartib bilan list shaklida qaytaradi. asyncio.wait() esa vazifalarning bajarilish holatini (masalan, birinchisi tugashi bo'yicha) nazorat qilish imkonini beradi.",
  },
  {
    id: "int_155",
    question: "CPU-bound va I/O-bound vazifalar qanday farqlanadi?",
    category: "Concurreny",
    answer: "CPU-bound hisob-kitoblar (matematika, rasm/video qayta ishlash) bo'lib, multiprocessing talab qiladi. I/O-bound tarmoq so'rovlari yoki fayl kutish amallari bo'lib, asyncio yoki multithreading bilan samarali ishlaydi.",
  },
  {
    id: "int_156",
    question: "ThreadPoolExecutor va ProcessPoolExecutor farqi nimada?",
    category: "Concurreny",
    answer: "ThreadPoolExecutor I/O-bound amallarida oqimlar pulini boshqaradi. ProcessPoolExecutor esa GIL cheklovini aylanib o'tib, CPU-bound vazifalarini parallel jarayonlar puli yordamida bajaradi.",
  },
  {
    id: "int_157",
    question: "Coroutine, Task va Future orasidagi farq va bog'liqlik nima?",
    category: "Concurreny",
    answer: "Coroutine - async def yordamida yozilgan asinxron funksiya. Task - korutinani Event Loop-da rejalashtiruvchi o'rovchi (wrapper). Future esa kelajakda olinadigan natijani ifodalovchi past darajali obyekt.",
  },
  {
    id: "int_158",
    question: "GIL (Global Interpreter Lock) nima va u Python-ga nega qo'shilgan?",
    category: "Concurreny",
    answer: "GIL CPython interpretatorida bir vaqtda faqat bitta thread Python bayt-kodini bajarishini ta'minlovchi mexanizmdir. U CPython-ning xotira boshqaruvini (reference counting) sodda va xavfsiz qilish uchun qo'shilgan.",
  },
  {
    id: "int_159",
    question: "Asinxron generatorlar nima va async for qanday ishlaydi?",
    category: "Concurreny",
    answer: "Asinxron generator yields yordamida ma'lumotlarni asinxron yuklab (masalan API dan sahifalab) uzatadi. async for esa har bir element kelganda kutib (await) siklni aylantiradi.",
    codeExample: `async def async_gen():
    yield 1
    await asyncio.sleep(1)`
  },
  {
    id: "int_160",
    question: "asyncio.sleep() va time.sleep() farqi nimada?",
    category: "Concurreny",
    answer: "time.sleep() butun jarayonni va Event Loop-ni to'liq bloklab (muzlatib) qo'yadi. asyncio.sleep() esa Event Loop-ni bloklamasdan, boshqaruvni vaqtincha boshqa asinxron vazifalarga topshiradi.",
  },
  {
    id: "int_161",
    question: "Threading modulidagi Event va Condition farqi nima?",
    category: "Concurreny",
    answer: "Event - oqimlar bir-biriga signal berishi (yoqish/o'chirish) uchun oddiy bayroq. Condition esa murakkabroq bo'lib, oqimlarni kutish rejimiga qo'yib, ma'lum shart bajarilganda ularni uyg'otish (notify) imkonini beradi.",
  },
  {
    id: "int_162",
    question: "Deadlock (O'lik qulf) nima va uning oldi qanday olinadi?",
    category: "Concurreny",
    answer: "Deadlock - ikki oqim bir-biriga qulflangan resurslarni o'zaro kutib qolishi. Oldini olish uchun qulflash tartibiga rioya qilish (lock ordering), with boshqaruvidan foydalanish yoki timeout qo'yish kerak.",
  },
  {
    id: "int_163",
    question: "Race Condition (Poyga holati) nima?",
    category: "Concurreny",
    answer: "Race Condition parallel oqimlar bitta umumiy resursni bir vaqtda o'zgartirmoqchi bo'lganda, yakuniy natija oqimlarning tasodifiy ishlash tezligiga bog'liq bo'lib qoladigan va xatolik keltiradigan holatdir.",
  },
  {
    id: "int_164",
    question: "multiprocessing.Queue va queue.Queue farqi nimada?",
    category: "Concurreny",
    answer: "queue.Queue bitta jarayon ichidagi oqimlar (threads) uchun mo'ljallangan. multiprocessing.Queue esa alohida jarayonlar (processes) orasida IPC (Inter-Process Communication) yordamida xavfsiz ma'lumot almashish uchun xizmat qiladi.",
  },
  {
    id: "int_165",
    question: "Daemon thread (Fon oqimi) nima va u qachon ishlatiladi?",
    category: "Concurreny",
    answer: "Daemon thread - asosiy dastur (main thread) tugashi bilan OS tomonidan avtomatik ravishda to'xtatiladigan fon oqimidir. U asosan logging yoki fon monitoringi uchun qo'llaniladi.",
  },
  {
    id: "int_166",
    question: "asyncio.create_task va asyncio.ensure_future farqi nimada?",
    category: "Concurreny",
    answer: "create_task() korutinani Task sifatida Event Loop-ga rejalashtirishning eng zamonaviy va tavsiya etilgan usulidir. ensure_future() esa Future va Task-larni qabul qiladigan past darajali universal yordamchidir.",
  },
  {
    id: "int_167",
    question: "Process-lar orasida ma'lumot almashish (IPC) qanday amalga oshiriladi?",
    category: "Concurreny",
    answer: "Jarayonlar xotirasi alohida bo'lgani uchun ular multiprocessing.Pipe, Queue yoki Shared Memory (qiymatlar va massivlar) yordamida ma'lumot almashadi.",
  },
  {
    id: "int_168",
    question: "Asinxron Context Manager qanday yoziladi?",
    category: "Concurreny",
    answer: "Asinxron context manager-da dunder metodlari async def bilan e'lon qilinadi va ular __aenter__ hamda __aexit__ deb nomlanadi.",
    codeExample: `class A:
    async def __aenter__(self): return self
    async def __aexit__(self, exc_type, exc, tb): pass`
  },
  {
    id: "int_169",
    question: "Starvation (Oqimlar ochligi) concurrency-da nima?",
    category: "Concurreny",
    answer: "Starvation - past ustuvorlikka ega bo'lgan oqim yoki jarayon, yuqori ustuvorlikdagi oqimlar resurslarni tinimsiz band qilishi sababli, o'z navbatini uzoq vaqt kuta olmay qolish holatidir.",
  },
  {
    id: "int_170",
    question: "threading.local() nima uchun ishlatiladi?",
    category: "Concurreny",
    answer: "threading.local() har bir oqim (thread) uchun alohida, xususiy ma'lumotlarni saqlash joyidir. Bitta oqim yozgan ma'lumotni boshqa oqim ko'ra olmaydi.",
  },
  {
    id: "int_171",
    question: "asyncio.run() nima vazifani bajaradi?",
    category: "Concurreny",
    answer: "U yangi Event Loop yaratadi, berilgan asinxron korutinani to'liq bajaradi va yakunida Event Loop-ni toza va xavfsiz yopadi. Dastur kirish nuqtasida bir marta chaqirilishi kerak.",
  },
  {
    id: "int_172",
    question: "Multiprocessing yordamida GIL cheklovi qanday chetlab o'tiladi?",
    category: "Concurreny",
    answer: "Har bir jarayon (Process) alohida OS jarayoni va shaxsiy Python interpretatoriga ega bo'ladi. Har bir interpretator o'zining shaxsiy GIL qulfiga ega bo'lgani sababli, protsessor yadrolaridan parallel foydalaniladi.",
  },
  {
    id: "int_173",
    question: "Semaphore va BoundedSemaphore farqi nimada?",
    category: "Concurreny",
    answer: "Semaphore resursga bir vaqtda kirishi mumkin bo'lgan oqimlar sonini cheklaydi. BoundedSemaphore esa release() chaqirilganda, uning boshlang'ich limitidan oshib ketishini tekshiradi va xato beradi.",
  },
  {
    id: "int_174",
    question: "Asinxron HTTP so'rovlar yuborishda nega requests kutubxonasi mos kelmaydi?",
    category: "Concurreny",
    answer: "requests kutubxonasi sinxron bo'lib, javob kelguncha Event Loop-ni bloklab qo'yadi. Asinxron dasturlarda uning o'rniga aiohttp yoki httpx kutubxonalari ishlatiladi.",
  },
  {
    id: "int_175",
    question: "await kalit so'zining vazifasi va u qayerlarda yozilishi mumkin?",
    category: "Concurreny",
    answer: "await faqat async def funksiyalar ichida yozilishi mumkin. U Event Loop-ga 'vazifa tugaguncha boshqa ishlarni bajarib tur, men kutaman' degan ishorani beradi.",
  },
  {
    id: "int_176",
    question: "Livelock va Deadlock farqi nimada?",
    category: "Concurreny",
    answer: "Deadlock-da oqimlar butunlay to'xtab qoladi (muzlaydi). Livelock-da esa oqimlar to'xtamaydi, balki o'zaro to'qnashuvni hal qilish uchun tinimsiz holatlarini o'zgartiradi, ammo hech qanday foydali ish bajarmaydi.",
  },
  {
    id: "int_177",
    question: "multiprocessing.Pool modulining vazifasi nima?",
    category: "Concurreny",
    answer: "Pool og'ir hisoblashlarni parallel bajarish uchun tayyor jarayonlar guruhini (pool) shakllantiradi va map() yordamida ma'lumotlarni jarayonlarga bo'lib yuboradi.",
    codeExample: `from multiprocessing import Pool
with Pool(4) as p:
    p.map(func, data)`
  },
  {
    id: "int_178",
    question: "asyncio.run_coroutine_threadsafe qachon ishlatiladi?",
    category: "Concurreny",
    answer: "U boshqa sinxron oqim (thread) ichidan turib asinxron Event Loop-ga korutina yuborish va natijani xavfsiz olish uchun ishlatiladi.",
  },
  {
    id: "int_179",
    question: "Cooperative multitasking va Preemptive multitasking farqi nima?",
    category: "Concurreny",
    answer: "Preemptive (oqimlarda) OS istalgan vaqtda oqimni to'xtatib boshqasiga o'tadi. Cooperative (asyncio-da) esa vazifa o'z ixtiyori bilan (await orqali) boshqaruvni Event Loop-ga topshiradi.",
  },
  {
    id: "int_180",
    question: "uvloop kutubxonasi nima va u qanday tezlik beradi?",
    category: "Concurreny",
    answer: "uvloop - standart asyncio event loop-ning tezkor o'rinbosari bo'lib, u C-tilidagi libuv kutubxonasi ustiga qurilgan va Node.js kabi asinxron ishlashni 2-4 baravar tezlashtiradi.",
  },
  {
    id: "int_181",
    question: "PEP 703 (free-threaded Python) nima?",
    category: "Concurreny",
    answer: "PEP 703 bu CPython interpretatoridan GIL (Global Interpreter Lock) qulflanishini butunlay olib tashlash rejasidir. Bu kelajakda Python multithreading-ni to'liq parallel ishlashiga imkon beradi.",
  },
  {
    id: "int_182",
    question: "threading.Barrier nima vazifani bajaradi?",
    category: "Concurreny",
    answer: "Barrier (to'siq) ma'lum miqdordagi parallel oqimlar kelib kutishini talab qiladi. Barcha belgilangan oqimlar yetib kelgandan keyingina to'siq ochiladi va oqimlar birga davom etadi.",
  },
  {
    id: "int_183",
    question: "AsyncIO-da xatoliklarni (Exceptions) qanday to'g'ri boshqariladi?",
    category: "Concurreny",
    answer: "Asinxron vazifalardagi xatolarni try-except yordamida await chaqirilganda ushlash mumkin yoki asyncio.gather ichida return_exceptions=True qilish orqali xatolarni natija sifatida yig'ish mumkin.",
  },
  {
    id: "int_184",
    question: "multiprocessing.Manager nima uchun kerak?",
    category: "Concurreny",
    answer: "Manager alohida jarayonlar orasida lug'at (dict) va ro'yxat (list) kabi murakkab Python ma'lumot turlarini xavfsiz va dinamik o'rtoqlashish imkonini beradi.",
  },
  {
    id: "int_185",
    question: "CPU-bound vazifani asinxron Event Loop ichida qanday to'g'ri bajarish kerak?",
    category: "Concurreny",
    answer: "Event Loop bloklanib qolmasligi uchun, og'ir hisoblash amali loop.run_in_executor() yordamida alohida oqim yoki jarayonlar puliga yuborilishi lozim.",
  },
  {
    id: "int_186",
    question: "asyncio.to_thread() funksiyasi qanday ishlaydi?",
    category: "Concurreny",
    answer: "Python 3.9+ da qo'shilgan ushbu funksiya sinxron bloklovchi funksiyalarni asinxron Event Loop ichida alohida thread-da ishga tushirish uchun qisqa va qulay interfeysdir.",
    codeExample: `await asyncio.to_thread(sync_func, arg)`
  },
  {
    id: "int_187",
    question: "Thread pool-da worker-lar sonini qanday tanlash kerak?",
    category: "Concurreny",
    answer: "I/O-bound vazifalarida oqimlar soni protsessor yadrolaridan ancha ko'p bo'lishi mumkin (masalan yadrolar * 5). Chunki oqimlar vaqtini hisoblashga emas, asosan kutishga sarflaydi.",
  },
  {
    id: "int_188",
    question: "asyncio.Lock va threading.Lock farqi nimada?",
    category: "Concurreny",
    answer: "threading.Lock OS darajasidagi oqimlarni bloklaydi. asyncio.Lock esa Event Loop darajasida korutinalarni navbatga qo'yadi va hech qanday OS oqimlarini bloklamaydi.",
  },
  {
    id: "int_189",
    question: "Producer-Consumer andozasini queue.Queue yordamida qanday yoziladi?",
    category: "Concurreny",
    answer: "Producer navbatga element qo'shadi (put). Consumer esa elementni olib (get) qayta ishlaydi va task_done() orqali navbat tugaganini bildiradi.",
  },
  {
    id: "int_190",
    question: "Zombie Process nima va multiprocessing-da u qanday tozalab turiladi?",
    category: "Concurreny",
    answer: "Zombie - o'z ishini tugatgan, lekin ota jarayon uning exit statusini o'qimaganligi sababli OS jarayonlar ro'yxatida qolib ketgan jarayondir. Ota jarayon active join() chaqirganda zombilar tozalanadi.",
  },
  {
    id: "int_191",
    question: "asyncio.Queue asinxron navbati nima uchun kerak?",
    category: "Concurreny",
    answer: "U asinxron korutinalar orasida ma'lumotlarni xavfsiz va tartibli almashish uchun foydalaniladi (non-blocking yield pattern).",
  },
  {
    id: "int_192",
    question: "Multiprocessing-da fork va spawn start metodlari farqi?",
    category: "Concurreny",
    answer: "fork joriy jarayon xotirasining to'liq nusxasini yaratadi (tezkor, Linux-da). spawn esa yangi toza Python interpreter jarayonini boshidan ishga tushiradi (xavfsizroq, Windows/macOS-da standart).",
  },
  {
    id: "int_193",
    question: "Asinxron dasturda korutina chaqirilganda await yozilmasa nima yuz beradi?",
    category: "Concurreny",
    answer: "Korutina ichidagi kod bajarilmaydi. Funksiya shunchaki korutina obyektini (coroutine object) qaytaradi va Python 'RuntimeWarning: coroutine was never awaited' ogohlantirishini beradi.",
  },
  {
    id: "int_194",
    question: "Python-da Thread-safe hisoblagich (counter) qanday yoziladi?",
    category: "Concurreny",
    answer: "Oqimlar poygasini oldini olish uchun hisoblagich qiymatini oshirish amali Lock bloki ichida yoziladi.",
    codeExample: `with lock:
    self.value += 1`
  },
  {
    id: "int_195",
    question: "asyncio.shield() nima vazifani bajaradi?",
    category: "Concurreny",
    answer: "U asinxron vazifani cancel() (bekor qilish) so'rovlaridan himoyalaydi. Ya'ni tashqi cancel chaqirilsa ham, shield qilingan korutina fonda ishlashda davom etadi.",
  },
  {
    id: "int_196",
    question: "Greenlet va Gevent nima?",
    category: "Concurreny",
    answer: "Gevent - Python-da korutina yordamida asinxron ishlashni ta'minlagan eski kutubxona. U Greenlet (yengil oqimlar) ustiga qurilgan bo'lib, sinxron kutubxonalarni asinxron qilish uchun 'monkey patching' texnologiyasidan foydalangan.",
  },
  {
    id: "int_197",
    question: "Concurrency va Parallelism farqi nima?",
    category: "Concurreny",
    answer: "Concurrency (Mos kelish) - bu bir vaqtda bir nechta vazifalar ustida ishlash (vazifalarni navbat bilan almashtirib bajarish). Parallelism - bu bir vaqtning o'zida parallel protsessor yadrolarida bir nechta vazifalarni real bajarishdir.",
  },
  {
    id: "int_198",
    question: "asyncio.all_tasks() nima qaytaradi?",
    category: "Concurreny",
    answer: "U Event Loop-da ayni vaqtda faol bo'lgan, hali yakunlanmagan barcha Task (vazifa) obyektlarining to'plamini (set) qaytaradi.",
  },
  {
    id: "int_199",
    question: "Multiprocessing Pool ichidagi imap va imap_unordered farqi?",
    category: "Concurreny",
    answer: "imap natijalarni kirish ma'lumotlari tartibida qaytaradi. imap_unordered esa qaysi jarayon birinchi tugasa, natijalarni o'sha tartibda (tartibsiz) qaytaradi, bu tezroq ishlashga yordam beradi.",
  },
  {
    id: "int_200",
    question: "Asinxron loglar yozishda (asynchronous logging) qaysi usul qo'llaniladi?",
    category: "Concurreny",
    answer: "Logging jarayoni bloklanishini oldini olish uchun log yozish vazifasi QueueHandler orqali fondagi oqimga (QueueListener) topshiriladi.",
    codeExample: `import logging.handlers
# QueueHandler yordamida loglarni jo'natish`
  }
];

export const projectSpecs: ProjectSpec[] = [
  {
    id: "proj_1",
    title: "Ob-havo Telegram Boti",
    difficulty: Difficulty.BEGINNER,
    points: 100,
    description: "Foydalanuvchidan shahar nomini so'rab olib, real vaqtda OpenWeatherMap API orqali harorat va shamol tezligini topib beruvchi Telegram Bot platformasi.",
    features: [
      "Shaharni kiritish va API request yuborish",
      "Kelgan JSON ma'lumotlarni parsing qilish",
      "Chiroyli emoji formatida habarni foydalanuvchiga qaytarish"
    ],
    steps: [
      "1. 'aiogram' yoki 'telebot' kutubxonasini o'rnatish.",
      "2. OpenWeather saytidan bepul API kalit (apiKey) olish.",
      "3. Python orqali shaharni qabul qiladigan handler'larni yozish.",
      "4. requests paketi yordamida ob-havo serveriga so'rov tashlash.",
      "5. Botni ishga tushirib sinovdan o'tkazish."
    ],
    architectureGuide: "User -> AI telegram bot (Telegram servers) -> Python API Router -> OpenWeather API",
    databaseSchema: "Boshlang'ich proyektlar uchun ma'lumotlar bazasi shart emas. Bot xotirada loglarni saqlashi mumkin."
  },
  {
    id: "proj_2",
    title: "FastAPI orqali Task Manager API (CRUD)",
    difficulty: Difficulty.INTERMEDIATE,
    points: 250,
    description: "Vazifalarni yaratish, tahrirlash, ro'yxatini ko'rish va o'chirish imkonini beruvchi to'liq asinxron API xizmati.",
    features: [
      "RESTful API arxitekturasi",
      "Pydantic validatsiyasi orqali malumotlar tiplari xavfsizligi",
      "Asinxron SQLAlchemy yoki Tortoise ORM orqali SQLite/Postgres DB aloqasi"
    ],
    steps: [
      "1. FastAPI va uvicorn o'rnatish.",
      "2. Ma'lumotlar sxemalarini (TaskSchema, TaskCreate) loyihalash.",
      "3. GET, POST, PUT, DELETE endpointlarini yozish.",
      "4. SQLite database ulanishi va migratsiyalar (Alembic) yaratish.",
      "5. Swagger UI (/docs) orqali ishlashini tekshirish."
    ],
    databaseSchema: `Table: tasks
  - id: Integer (Primary Key)
  - title: String (Not Null)
  - description: Text (Optional)
  - is_completed: Boolean (Default False)
  - created_at: DateTime`,
    architectureGuide: "Client -> FastAPI HTTP Server -> SQLite Database with Async Session ContextManager"
  },
  {
    id: "proj_3",
    title: "E-Commerce Microservice backend",
    difficulty: Difficulty.ADVANCED,
    points: 500,
    description: "Katta yuklamalarga chidamli, JWT orqali autentifikatsiya, Redis kesh tizimi hamda PostgreSQL ma'lumotlar bazasiga ulangan professional microservice platformasi.",
    features: [
      "JWT-token-based RBAC (Admin, Seller, Buyer) tizimi",
      "Redis yordamida tezkor mahsulotlar keshini saqlash",
      "Celery orqali asinxron email xabarnomalarini jo'natish (Background tasks)"
    ],
    steps: [
      "1. Django backend yoki FastAPI modular arxitekturani sozlash.",
      "2. PostgreSQL migratsiyalarini tayyorlash va ulanish.",
      "3. Redis kesh qatlamini (django-redis yoki aioredis) sozlash.",
      "4. Celery va RabbitMQ/Redis navbatlar menejerini ulash.",
      "5. Dockerfile, docker-compose.yml fayllari bilan deploy'ga tayyorlash."
    ],
    databaseSchema: `Table: users
  - id: UUID
  - email: String (Unique)
  - password_hash: String
  - role: Enum (admin, seller, buyer)

Table: products
  - id: UUID
  - name: String
  - price: Numeric
  - stock: Integer
  - seller_id: ForeignKey(users.id)`,
    architectureGuide: "Docker Compose: [Express/Nginx Load Balancer] -> [FastAPI Service] <--> [Postgres & Redis Keshi] + [Celery Worker <-- RabbitMQ]"
  }
];

export const initialLeaderboard: LeaderboardEntry[] = [
  { uid: "l1", name: "Anvarbek Olimov", xp: 3250, avatar: "AO", rank: 1 },
  { uid: "l2", name: "Kamola T.", xp: 2800, avatar: "KT", rank: 2 },
  { uid: "l3", name: "Jasur PyDev", xp: 2450, avatar: "JP", rank: 3 },
  { uid: "currentUser", name: "Foydalanuvchi", xp: 0, avatar: "F", rank: 4, isCurrentUser: true },
  { uid: "l5", name: "Shaxzod Backend", xp: 1890, avatar: "SB", rank: 5 }
];

export const achievementsList = [
  { id: "ach_1", title: "Kashfiyotchi", desc: "Birinchi nazariy darsni to'liq yakunladingiz.", icon: "BookOpen" },
  { id: "ach_2", title: "Sandbox Mutaxassisi", desc: "Amaliy kod muharririda muvaffaqiyatli kod bajardingiz.", icon: "Terminal" },
  { id: "ach_3", title: "Bilimdon", desc: "Biror modul testini 100% natija bilan topshirdingiz.", icon: "Award" },
  { id: "ach_4", title: "Sertifikatlangan Dasturchi", desc: "Barcha kurs va imtihonlarni topshirib dars sertifikatini oldingiz.", icon: "FileBadge" }
];
