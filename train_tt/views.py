from django.shortcuts import render, HttpResponse
from train_tt.models import *
import json


from fpdf import FPDF
import os


def formate_data(data):
    tno = data['train_no']
    tname = data['train_name']
    train_from = data['train_from']
    train_to = data['train_to']
    date = str(data['date'])
    all_det = data['data']['data']

    print_data = ""

    print("date:", data)

    pdf = FPDF()

    for each in all_det:
        temp = each.split('___')
        coach = temp[1]
        cno = temp[2]

        cno_space = (30-len(coach))*" "

        print_data += f'''
==========================================================================================
RESERVATION CHART FOR

COACH : {coach}{cno_space}COACH NO : {cno}

DATE  : {date}                    TRAIN NO : {tno} {tname}		

{train_from} To {train_to}
-------------------------------------------------------------------------------------------
S/B No.          FROM              TO	                STATUS
-------------------------------------------------------------------------------------------
        
        '''

        raw_data = all_det[each]
        if raw_data is None:
            print_data = ""
            continue
        for i in raw_data:
            req_data = raw_data[i]
            sb_space = (15-len(req_data[0]))*" "
            from_space = (15-len(req_data[1]))*" "
            to_space = (15-len(req_data[2]))*" "

            print_data += f'''
{req_data[0]} {sb_space} {req_data[1]} {from_space} {req_data[2]} {to_space} {req_data[3]}'''
        print_data += '''
        '''

        with open('static/varuns_pdf/sync.txt', 'w') as f:
            f.write(print_data)

        pdf.add_page()
        print_data = ""

        pdf.set_font("Courier", size=10)
        pdf.set_margins(left=10, top=5, right=10)

        # open the text file in read mode
        f = open("static/varuns_pdf/sync.txt", "r")
        for x in f:
            pdf.cell(20, 5, txt=x, ln=1, align='L')
        f.close()

    pdf.output("static/varuns_pdf/sync.pdf")
    os.remove("static/varuns_pdf/sync.txt")


# Create your views here.

def clear_specific_key(request):
    # Remove a specific key from local storage
    del request.session['train_no']
    # Save the changes to session
    request.session.save()


def home(request):
    return render(request, 'home.html')


def raw(request):
    if request.method == 'POST':

        tno = request.POST.get('tno', False)
        try:
            data = train_dest.objects.filter(train_no=tno)[0]
            coach_det = Coach_detail.objects.filter(train_no=tno)[0]

            # print(data.train_name)

            no = data.train_no
            name = data.train_name
            st_code = data.station_codes
            st_code = st_code.replace("[", '').replace(
                "]", '').replace("\r\n", '')
            rev = data.reversed

            coach = coach_det.Coach.replace("[", '').replace(
                "]", '').replace("\r\n", '')

            from_dest = st_code.split(
                ',')[-1] if rev else st_code.split(',')[0]
            to_dest = st_code.split(',')[0] if rev else st_code.split(',')[-1]

            return_data = {
                'train_no': no,
                'train_name': name,
                'From': from_dest,
                'To': to_dest,
                'Coach': coach,
                'Station': st_code

            }

            # print(return_data)
            return render(request, 'raw.html', return_data)
    # return render(request, 'raw.html', return_data)
        except:

            return render(request, 'tno_error.html')
    else:
        return render(request, 'error_page.html')


def display(request):
    tno = request.GET.get('tno')
    send_data = {'tno': tno}
    return render(request, 'reservation.html', send_data)


def sync_data(request):
    data = request.POST.get('data')
    data = json.loads(data)
    formate_data(data)
    # print('here', data)
    return HttpResponse({'status': 'success'})
