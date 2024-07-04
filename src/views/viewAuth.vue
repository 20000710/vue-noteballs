<template>
	<div class="auth">
		<div class="tabs is-centered">
			<ul>
				<li 
					:class="{ 'is-active' : !register }"
				>
					<a
						@click.prevent="register = false"
						class="mb-0" 
					>Login</a>
				</li>
				<li 
					:class="{ 'is-active' : register }"
				>
					<a
						@click.prevent="register = true"
						class="mb-0" 
					>Register</a>
				</li>
			</ul>
		</div>
		<div class="card auth-form">
			<div class="card-content">
				<div class="title has-text-centered">
					{{ formTitle }}
				</div>
				<form
					@submit.prevent="onsubmit"
				>
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input
                v-model="credentials.email"
                class="input" 
                type="email" 
                placeholder="Enter an email"
              >
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input
                v-model="credentials.password" 
                class="input" 
                type="password" 
                placeholder="Enter a password"
              >
						</div>
							
						<div class="field is-grouped is-grouped-right pt-4">
							<p class="control">
								<button class="button is-primary">
									{{ formTitle }}
								</button>
							</p>
						</div>
					</div>
				</form>	
			</div>
		</div>
	</div>
</template>

<script setup>
/*
	imports
*/
  import { computed, reactive, ref } from 'vue';
  import { useStoreAuth } from '@/stores/storeAuth';

/*
  store
*/
  const storeAuth = useStoreAuth()

/*
	register/login
*/
	const register = ref(false)

/*
	form title
*/
	const formTitle = computed(() => {
		return register.value ? 'Register' : 'Login'
	})

/*
  credentials
*/
  const credentials = reactive({
    email: '',
    password: ''
  })

/*
	submmit
*/
	const onsubmit = () => {
		if(!credentials.email || !credentials.password) {
      alert('Please enter an email and password!')
    } else {
      if(register.value) {
        storeAuth.registerUser(credentials)
      } else {
        storeAuth.loginUser(credentials)
      }
    }
	}

</script>

<style>
	.auth-form{
		max-width: 400px;
		margin: 0 auto;
	}
</style>