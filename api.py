from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
import requests
import io

app = FastAPI()

@app.get("/download")
def download_grade_sheet(student_id: str, nick_name: str):
    url = (
        f"https://usis.bracu.ac.bd/academia/docuJasper/index?studentId={student_id}&reportFormat=PDF&old_id_no"
        f"={student_id}&strMessage=&scholarProgramMsg=&companyLogo=%2Fvar%2Facademia%2Fimage%2FuniversityLogo"
        f"%2F1571986355.jpg&companyName=BRAC+University&headerTitle=GRADE+SHEET&companyAddress=66%2C"
        f"+MOHAKHALI+C%2FA%2C+DHAKA+-+1212.&academicStanding=Satisfactory&gradeSheetBackground=%2Fbits"
        f"%2Fusis%2Ftomcat%2Fwebapps%2Facademia%2Fimages%2FgradeSheetBackground.jpg&_format=PDF&_name="
        f"{nick_name}&_file=student%2FrptStudentGradeSheetForStudent.jasper"
    )

    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Grade sheet not found")

    return StreamingResponse(io.BytesIO(response.content), media_type="application/pdf", headers={
        "Content-Disposition": f"attachment; filename={nick_name}_grade_sheet.pdf"
    })
