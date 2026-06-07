import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const gifts = [
    {
        name: "Vintage Camera",
        category: "Living",
        condition: "Older",
        date_added: new Date().toISOString(),
        age_years: 15,
        description: "A beautiful vintage camera from the 70s. Still works!",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Modern Lamp",
        category: "Office",
        condition: "New",
        date_added: new Date().toISOString(),
        age_years: 1,
        description: "Sleek modern lamp for your desk.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Cozy Blanket",
        category: "Bedroom",
        condition: "Like New",
        date_added: new Date().toISOString(),
        age_years: 2,
        description: "Very warm and soft blanket.",
        image: "https://images.unsplash.com/photo-1580302212146-f6a84067c29e?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Cast Iron Skillet",
        category: "Kitchen",
        condition: "Older",
        date_added: new Date().toISOString(),
        age_years: 5,
        description: "Seasoned and ready for cooking.",
        image: "https://images.unsplash.com/photo-1590159441804-5e82f763cd07?auto=format&fit=crop&w=800&q=80"
    }
];

async function seed() {
    console.log("Seeding data...");
    const giftsCol = collection(db, "gifts");
    
    // Clear existing for fresh start
    const snapshot = await getDocs(giftsCol);
    for (const d of snapshot.docs) {
        await deleteDoc(doc(db, "gifts", d.id));
    }

    for (const gift of gifts) {
        await addDoc(giftsCol, gift);
    }
    console.log("Seeding complete!");
    process.exit(0);
}

seed().catch(console.error);
