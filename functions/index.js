const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();

export const app = functions.https.onRequest(async (req, res) => {
  // save every request. use it for analytics purposes.
  await db
    .collection('requests')
    .add({
      headers: req.headers,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      url: req.url,
    })
    .catch(e => console.error(e));

  // keep count of how many requests have been made
  await db
    .doc('/counters/requests')
    .set({ count: admin.firestore.FieldValue.increment(1) }, { merge: true })
    .catch(e => console.error(e));

  // this is optional, but should be the right way.
  // redirect to some landing page.
  if (req.path === '/') return res.redirect('https://example.com');

  // check firestore database if there is any valid short link
  const snap = await db
    .collection('links')
    .where('short', '==', req.path.split('/')[1])
    .get()
    .catch(e => console.error(e));

  // redirect as apprioprate
  if (!snap || snap.size === 0) {
    res.status(404).send('Invalid short link');
  } else {
    res.redirect(snap.docs[0].data().long);
  }
});

// keep count of newly added links
export const increaseLinkCount = functions.firestore
  .document('/links/{linkId}')
  .onCreate(async () => {
    await db
      .doc('/counters/links')
      .set({ count: admin.firestore.FieldValue.increment(1) }, { merge: true })
      .catch(e => console.error(e));
  });

// keep count of deleted links
export const reduceLinkCount = functions.firestore
  .document('/links/{linkId}')
  .onDelete(async () => {
    await db
      .doc('/counters/links')
      .set({ count: admin.firestore.FieldValue.increment(-1) }, { merge: true })
      .catch(e => console.error(e));
  });
