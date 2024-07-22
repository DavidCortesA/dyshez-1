'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { toast } from 'react-hot-toast' 

import { createClient } from './supabase/server'

export async function login(email, password) {
  const supabase = createClient();

  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    toast.error(error.message)
    console.log(error);
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    toast.error(error.message) 
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function getOrders() {
  const supabase = createClient()
  const { data, error } = await supabase.from('orders').select('')
  console.log(error);

  return data;
}
