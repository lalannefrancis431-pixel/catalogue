const { createClient } = require('@supabase/supabase-js')

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .from('avis')
      .insert([
        {
          nom: body.nom,
          message: body.message,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}