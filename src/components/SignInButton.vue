<script setup lang="ts">
import { ref } from 'vue'
import { decodeCredential, GoogleSignInButton, type CredentialResponse, type DecodedGoogleUser } from 'vue3-google-signin'

// create a reactive variable to track the login status
const loggedIn = ref(false)
const  decodedCredential = ref<DecodedGoogleUser>();

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response
  if (!credential) {
    console.error('Credential is undefined')
    return
  }
  loggedIn.value = true
  decodedCredential.value = decodeCredential(credential)
  console.log('Access Token', decodedCredential)
}

// handle an error event
const handleLoginError = () => {
  loggedIn.value = false
  console.error('Login failed')
}
</script>

<template>
  <GoogleSignInButton v-show="!loggedIn" @success="handleLoginSuccess" @error="handleLoginError" />
  <div v-show="loggedIn">Hello {{ decodedCredential?.email }}</div>
</template>
