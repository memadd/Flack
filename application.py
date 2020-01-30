from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = '11jhbhhfgv5kuy'
socketio = SocketIO(app)

data = {'channels':[], 'users':[], 'chat':[]}


@app.route("/", methods=["GET", "POST"])
def index():
    
    return render_template('index.html', data=data)

@app.route("/sign/", methods=["GET", "POST"])  
def sign():
    if request.method == 'POST':
        displayname = request.form.get('displayname')
        
        data['users'].append(displayname)
        
        session['logged_in'] = True
        session['username'] = displayname
        return redirect(url_for('home')) 
    return render_template('sign.html')  

@app.route("/login/", methods=["GET", "POST"] ) 
def login():
    
    if request.method == 'POST':
        loginname = request.form.get('loginname')
        if loginname in data['users']:
            session['logged_in'] = True
            session['username'] = loginname
            return redirect(url_for('home')) 
        
        return render_template('login.html')  
    return render_template('login.html')              
@app.route('/home/', methods=["GET", "POST"])
def home():
    msg = ''
    if request.method == 'POST':
        channelname = request.form.get('channelname')
        if channelname in data['channels']:
            msg = ' this name already exist '
            return render_template('home.html', msg=msg, channels=data['channels'])
        data['channels'].append(channelname)
        return render_template('home.html', channels=data['channels'])   
        
    return render_template('home.html', channels=data['channels'])  

@app.route('/home/<string:channel>')  
def channel (channel):
    channel=channel

    return render_template('channel.html',channel=channel, msgs=data['chat'])   

@socketio.on("myevent")
def handle_my_custom_event(json):
    print('received somthing' + str(json))
    data['chat'].append((json['userName'],json['message']))
    print(data['chat'])
    if len(data['chat'])==100:
        del data['chat'][0]
    socketio.emit('my response', json) 
    
@socketio.on("channel")
def my_last_channel(json):
    print(json['channel'])
    destination = json['channel']
    #destination = "/{}".format(channel)
    socketio.emit('redirect', destination ) 
      

if __name__ == '__main__':
    socketio.run(app)    
