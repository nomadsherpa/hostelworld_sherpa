# frozen_string_literal: true

# This class is a wrapper around the mitmdump command line tool.
# It is used to save and replay HTTP traffic.
class MitmdumpProxy
  CASSETTE_DIR = File.join("spec", "fixtures", "mitmproxy_flows")

  def self.use_cassette(cassette_name)
    if File.exist?("#{CASSETTE_DIR}/#{cassette_name}.flows")
      start_replay_proxy(cassette_name)
    else
      start_record_proxy(cassette_name)
    end
  end

  def self.start_replay_proxy(cassette_name)
    command = [
      "mitmdump",
      "--server-replay", "#{CASSETTE_DIR}/#{cassette_name}.flows",
      "--set", "connection_strategy=lazy"
    ]

    @pid = spawn(*command)
    Process.detach(@pid)
  end

  def self.start_record_proxy(cassette_name)
    command = [
      "mitmdump",
      "--save-stream-file", "#{CASSETTE_DIR}/#{cassette_name}.flows"
    ]

    @pid = spawn(*command)
    Process.detach(@pid)
  end

  def self.eject_cassette
    return if @pid.nil?

    pid = @pid
    @pid = nil

    Process.kill("TERM", pid)
    Process.wait(pid)
  end
end

at_exit do
  MitmdumpProxy.eject_cassette
end
