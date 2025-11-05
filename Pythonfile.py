import sqlite3
import os

# -- Configuration --
DB_FILE = 'attendance_db.db'

# -- 1) (Re)create the database file --
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

# -- 2) Connect and set up schema --
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    department TEXT,
    type TEXT
);
''')

# -- 3) Seed data --
seed_data = [
    (1, "Mr. Manash Ranjan Ghosh", "Lecturer", "Electrical Engineering", None),
    (2, "Mr. Bikash Mondal", "Lecturer", "Mechanical Engineering", None),
    (3, "Mr. Sankha Ghosh", "Lecturer", "Civil Engineering", None),
    (4, "Dr. Ritwik Chakraborty", "Lecturer", "Civil Engineering", None),
    (5, "Mr. Tapan Biswas", "Lecturer", "Science & Humanities", None),
    (6, "Mr. Sanjoy Saha", "Lecturer", "Electrical Engineering", None),
    (7, "Dr. Supriyo Mukherjee", "Lecturer", "Civil Engineering", None),
    (8, "Mr. Debashis Biswas", "Lecturer", "Mechanical Engineering", None),
    (9, "Mr. Kaushik Haldar", "Lecturer", "Chemistry", None),
    (10, "Mr. Suvankar Basu Mallick", "Lecturer", "Civil Engineering", None),
    (11, "Mr. Hemadri Chatterjee", "Lecturer", "Science & Humanities", None),
    (12, "Mr. Tapas Chakraborty", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (13, "Mr. Rupesh Kr. Jain", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (14, "Mr. Debajyoti Roy Barma", "Lecturer", "Civil Engineering", None),
    (15, "Mr. Krishnendu Haldar", "Lecturer", "Electrical Engineering", None),
    (16, "Mr. Subhajit Ojha", "Lecturer", "Civil Engineering", None),
    (17, "Mr. Pritam Ghosh", "Lecturer", "Mechanical Engineering", None),
    (18, "Mr. Sreejit Mahanta", "Lecturer", "Electrical Engineering", None),
    (19, "Mr. Ayan Saha", "Lecturer", "Electrical Engineering", None),
    (20, "Mr. Pravin Kumar", "Lecturer", "Electrical Engineering", None),
    (21, "Mr. Atit Sarkar", "Workshop Instructor", "Pattern Shop", None),
    (22, "Mr. Arunava Ghosh", "Workshop Instructor", "Mechanical Engineering", None),
    (23, "Mr. Arun Kumar Majumder", "Workshop Instructor", "Mechanical Engineering", None),
    (24, "Mr. Avijit Halder", "Workshop Instructor", "Mechanical Engineering", None),
    (25, "Mr. Amit Kumar Mondal", "Workshop Instructor", "Mechanical Engineering", None),
    (26, "Mr. Samaresh Pal", "Workshop Instructor", "Mechanical Engineering", None),
    (27, "Mr. Arnab Goswami", "Workshop Instructor", "Mechanical Engineering", None),
    (28, "Mr. Santanu Bhattacharjee", "Store Keeper", "STORE", None),
    (29, "Mr. Subal Chandra Sarkar", "Store Assistant", "STORE", None),
    (30, "Mr. Tapas Kumar Biswas", "Junior Clerk", "OFFICE", None),
    (31, "Mr. Rajat Mondal", "Typist", "OFFICE", None),
    (32, "Mr. Avinaba Biswas", "Laboratory Assistant", "Civil Engineering", None),
    (33, "Mr. Biswanath Chakraborty", "Group D Staff", "OFFICE", None),
    (34, "Mr. Ashim Seal", "Group D Staff", "OFFICE", None),
    (35, "Mr. Narottam Sarkar", "Group D Staff", "OFFICE", None),
    (36, "Mr. Shyam Prakash Shaw", "Group D Staff", "OFFICE", None),
    (37, "Mr. Arindam Das", "Group D Staff", "OFFICE", None),
    (38, "Mr. Somen Das", "Group D Staff", "OFFICE", None),
    (57, "Mr. Totan Halder", "Workshop Instructor", "Mechanical Engineering", None),
    (58, "Mr. Naresh Murmu", "Laboratory Assistant", "Electrical Engineering", None),
    (39, "Mr. Paritosh Maiti", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (40, "Mr. Swapan Kr. Mondal", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (41, "Mr. Santanu Basu", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (42, "Mr. Sagar Bose", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (43, "Mr. Subhajit Ghosh", "Lecturer", "Civil Engineering", None),
    (44, "Mr. Partha Sarkar", "Lecturer", "Electronics & Telecommunication Engineering", None),
    (46, "Mr. Satyaban Basuri", "Lecturer", "Electrical Engineering", None),
    (47, "Mr. Prasenjit Das", "Lecturer", "Dept1", None),
    (48, "Mr. Subhash Kr. Nandy", "Junior Lecturer", "Mechanical Engineering", None),
    (49, "Mr. Anjan Sengupta", "Junior Lecturer", "Electronics & Telecommunication Engineering", None),
    (50, "Mr. Subrata Kr. Brahma", "Laboratory Assistant", "Civil Engineering", None),
    (51, "Mr. Biswajit Halder", "Group D cum Electrician", "Electrical Engineering", None),
    (52, "Mr. Ramajiban Layek", "Maintenance Supervisor", "Mechanical Engineering", None),
]

cursor.executemany('''
    INSERT INTO staff (id, name, designation, department, type)
    VALUES (?, ?, ?, ?, ?)
''', seed_data)

# -- 4) Finalize --
conn.commit()
conn.close()

print(f"✔ Database '{DB_FILE}' created and seeded with {len(seed_data)} staff records.")
