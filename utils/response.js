const statusMap = {
    success: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalError: 500,
};

exports.response = (res, status, message, data=[])=>{
    res.set('Cache-Control', 'public, max-age=604800'); // cache for 7 days
    res.set('X-Content-Type-Options', 'nosniff'); // prevent MIME type sniffing
    res.set('X-Frame-Options', 'DENY'); // prevent clickjacking
    res.set('X-XSS-Protection', '1; mode=block'); // enable XSS protection

    return res.status(statusMap[status]||404).json({
        status,
        message,
        data: data ?? undefined, // avoid sending null
        statusCode: statusMap[status]
    })
} 