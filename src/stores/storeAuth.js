import { defineStore } from 'pinia'
import { auth } from '@/js/firebase';
import { useStoreNotes } from './storeNotes';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()
      const user = auth.currentUser;
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push("/")
          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace("/auth")
          storeNotes.clearNotes()
        }
      })
    }, 
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
          const user = userCredential.user;
          // console.log('user: ', user)
      })
      .catch((error) => {
        // console.log("error message", error.message);
      })
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
      // const user = userCredential.user;
      // console.log("user ", user)
    }).catch((error) => {
      // console.log("error message: ", error.message)
    });

    },
    logoutUser(){
      signOut(auth).then(() => {
        console.log("User signed out.")
      }).catch((error) => {
        console.log(error.message)
      });
    }
  }
})