import { submitContactForm } from '@/lib/cosmic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Submit to Cosmic
    const formData = {
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company?.trim() || '',
      message: body.message.trim(),
    }

    const submission = await submitContactForm(formData)

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submission: {
        id: submission.id,
        created_at: submission.created_at,
      }
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    )
  }
}