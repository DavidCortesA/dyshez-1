'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { createClient } from './supabase/server'

export async function login(email, password) {
  const supabase = createClient();

  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Invalid credentials")
  }

  revalidatePath('/', 'orders')
  redirect('/orders')
}

export async function signup(userInfo) {
  const supabase = createClient()

  const { name, lastName, phone, email, celphone, webSite, password } = userInfo;

  const data = {
    email: email,
    password: password // You'll need to get the password from the form
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error(error.message) 
    return; // Stop execution if there's an error
  }

  const { data: user, error: profileError } = await supabase
    .from('users')
    .insert({
      name,
      lastName,
      phone,
      celphone,
      webSite,
      // ... other fields you want to store
    })

  if (profileError) {
    console.error(profileError.message)
    return; // Stop execution if there's an error
  }

  // Redirect to a success page or the login page
  redirect('/')
}

export async function getOrders() {
  const supabase = createClient()
  const { data: orders, error } = await supabase.from('orders').select('')

  return orders;
}

export async function getPictures() {
  const supabase = createClient()
  
  const { data , error } = await supabase.storage.from('pictures').list('');

  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function postPicture(fileData) {
  const supabase = createClient();
  const { name, type, size } = fileData;

  try {
    const { data, error } = await supabase.storage
      .from('pictures')
      .upload(name, new File([fileData], name, { type })); 

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    console.log(data);

    return { name, url: data.Key };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deletePicture(fileName) {
  const supabase = createClient();

  try {
    const { error } = await supabase.storage
      .from('pictures')
      .remove([fileName]); // Remove the file with the given fileName

    if (error) {
      console.error('Error deleting file:', error);
      throw error;
    }

    return true; // Indicate successful deletion
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

